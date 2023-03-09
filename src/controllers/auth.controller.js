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
import CryptoUtils from '../utils/crypto.utils';
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
			//  Checking if the fields have data.
			const { username, email, password } = req.body;
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
				password: CryptoUtils.hash(password),
			});
			// With the new user created, we can save the payload.
			const payload = {
				username: username,
				email: email,
				password: CryptoUtils.hash(password),
			};
			// Generate activate token.
			const activationToken = JWTUtils.createActivateToken(payload);

			// Once the activation token is created, we need to save it in the token collection.
			const newActivateToken = await MongoConnector.create(tokenModel, {
				user: newUser._id,
				value: activationToken.token,
				type: 'activate',
				expiresIn: activationToken.expiresIn,
				issuedAt: new Date(),
			});

			// Build the URL for the activation token
			const activateURL = `${CONFIG.FRONTEND_URL}/auth/activate/${activationToken.token}`;

			// Generate revoke token.
			const revokeToken = JWTUtils.createRevokeToken(payload);

			// Once the revoke token is created, we need to save it in the token collection.
			const newRevokeToken = await MongoConnector.create(tokenModel, {
				user: newUser._id,
				value: revokeToken.token,
				type: 'revoke',
				expiresIn: revokeToken.expiresIn,
				issuedAt: new Date(),
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
					<button>ACTIVATE ACCOUNT</button> // ! TODO template class 
					<button>REVOKE ACCOUNT</button>
				`;
			await mailer.send(email, subject, body);

			// Response 201 - OK
			response.created('OK');
		} catch (err) {
			response.error(err);
		}
	}

	async login(req, res) {
		const response = new HTTPResponse(res);
		try {
		} catch (err) {
			response.error(err);
		}
	}
}
