/**
 * @author Rafa Fernandez <imraphiki@gmail.com>
 * @modified
 */
import CONFIG from '../config/config';
import HTTPResponse from '../utils/http.response';
import MongoConnector from '../utils/mongo.connector';
import StandardController from './standard.controller';
import { userModel } from '../models/user.model';
import { tokenModel } from '../models/token.model';
import PasswordUtils from '../utils/password.utils';
import { match, hash } from '../utils/crypto.utils';
import JWTUtils from '../utils/jwt.utils';
import Mailer from '../utils/nodemailer.util';

class AuthController extends StandardController {
	/**
	 * @constructor using user model into super constructor.
	 */
	constructor() {
		super(userModel);
	}

	/**
	 * Method signup to check the information and if it correct, create a new user.
	 * @param { import('express').Request } req
	 * @param { import('express').Response } res
	 * @returns code 201
	 */
	async signup(req, res) {
		const response = new HTTPResponse(res);
		try {
			const { username, email, password } = req.body;
			//  Checking if the fields have data.
			if (!username || !email || !password) {
				return response.badRequest('Wrong user data', 'USER_DATA_EMPTY', {
					username,
					email,
					password,
				});
			}

			// Checking if the user already exists.
			const user = await MongoConnector.findOne(userModel, {
				email: email,
			});

			if (user) {
				return response.conflict(
					'User already exists.',
					'USER_ALREADY_EXISTS',
					undefined,
				);
			}

			// Checking if the password match with passwords rules.
			if (password) {
				const result = PasswordUtils.eval(password);
				if (result.length > 0) {
					return response.badRequest(
						'Wrong password rules',
						'WRONG_PASSWORD_RULES',
						result,
					);
				}
			}

			// Create a new user hashing the password.
			const newUser = await MongoConnector.create(userModel, {
				username: username,
				role: 'user',
				email: email,
				password: hash(password),
			});
			// Create payload object from new user
			const payload = JWTUtils.genAuthPayload(newUser);
			// Generate activate token.
			const activationToken = JWTUtils.createActivateToken(payload);

			// Once the activation token is created, we save it
			const newActivateToken = await MongoConnector.create(tokenModel, {
				user: newUser._id,
				value: activationToken.token,
				type: 'activate',
				expiresIn: activationToken.expiresIn,
				issuedAt: activationToken.issuedAt,
			});

			// Build the URL for the activation token
			const activateURL = `${CONFIG.FRONTEND_URL}/auth/activate/${activationToken.token}`;

			// Generate revoke token.
			const revokeToken = JWTUtils.createRevokeToken(payload);

			// Once the revoke token is created, we save it
			const newRevokeToken = await MongoConnector.create(tokenModel, {
				user: newUser._id,
				value: revokeToken.token,
				type: 'revoke',
				expiresIn: revokeToken.expiresIn,
				issuedAt: revokeToken.issuedAt,
			});

			// Build the URL for the revoke token
			const revokeURL = `${CONFIG.FRONTEND_URL}/auth/revoke/${revokeToken.token}`;

			/**
			 * Using nodemailer to send an email notification with both tokens,
			 * activate and revoke.
			 */
			const mailer = new Mailer();
			const subject = `Welcome to DevsGhost3 ${user}.`;
			const body = `
					<h2>Test Sign Up mail</h2>
					<p>Resend me and email if you recieve this message.</p>
					<a href=${activateURL}>ACTIVATE ACCOUNT</a> 
					<a href=${revokeURL}>REVOKE ACCOUNT</a>
				`;
			// Sending mail
			await mailer.send(email, subject, body);

			// If both tokens are not created, send error 500
			if (!newActivateToken && !newRevokeToken) {
				return response.error(
					'Token generation failed',
					'TOKEN_EROR',
					undefined,
				);
			}
			// If both tokens are created, send 201
			return response.created('OK');
		} catch (err) {
			response.error(err);
		}
	}

	async login(req, res) {
		const response = new HTTPResponse(res);
		try {
			//  Checking if the fields have data.
			const { usernameOrEmail, password } = req.body;
			if (!usernameOrEmail || !password) {
				return response.badRequest('Wrong user data', 'USER_DATA_EMPTY', {
					usernameOrEmail,
					password,
				});
			}

			/**
			 * Check user input data
			 * Search usernameOrEmail matches into database
			 */
			const user = await MongoConnector.findOne(userModel, {
				$or: [{ username: usernameOrEmail }, { email: usernameOrEmail }],
			});

			// If user isn't instance, response not found 404.
			if (!user) {
				return response.notFound('User not found.', undefined);
			}

			// If don't match the encrypted passwords, response unauthorized 403.
			if (!match(password, user.password)) {
				return response.unauthorized('Wrong password.', undefined);
			}

			// If user is not active, response conflict 409.
			if (!user.isActive()) {
				return response.conflict('User is not active.', undefined);
			}

			// If user is blocked, response conflict 409.
			if (user.isBlocked()) {
				return response.conflict('User is blocked.', undefined);
			}

			// All right with the user data
			// Create payload object from login user data
			const payload = JWTUtils.genAuthPayload(user);

			// Generate access token.
			const accessToken = JWTUtils.createAuthToken(payload);

			// Once the access token is created, we save it
			const newAccessToken = await MongoConnector.create(tokenModel, {
				user: user._id,
				value: accessToken.token,
				type: 'access',
				expiresIn: accessToken.expiresIn,
				issuedAt: accessToken.issuedAt,
			});

			// Generate refresh token.
			const refreshToken = JWTUtils.createRefreshToken(payload);

			// Once the refresh token is created, we save it
			const newRefreshToken = await MongoConnector.create(tokenModel, {
				user: user._id,
				value: refreshToken.token,
				type: 'refresh',
				expiresIn: refreshToken.expiresIn,
				issuedAt: refreshToken.issuedAt,
			});

			// If both tokens are not created, send error 500
			if (!newAccessToken && !newRefreshToken) {
				return response.error(
					'Token generation failed',
					'TOKEN_EROR',
					undefined,
				);
			}
			// If both tokens are created, send success 200
			return response.success('OK', payload);
		} catch (err) {
			response.error(err);
		}
	}
}
