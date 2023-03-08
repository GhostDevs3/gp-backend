/**
 * @author Rafa Fernandez <imraphiki@gmail.com>
 * @modified
 */
import HTTPResponse from '../utils/http.response';
import MongoConnector from '../utils/mongo.connector';
import StandardController from './standard.controller';
import { userModel } from '../models/user.model';
import { tokenModel } from '../models/token.model';
import PasswordUtils from '../utils/password.utils';
import CryptoUtils from '../utils/crypto.utils';
import JWTUtils from '../utils/jwt.utils';

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
				value: activationToken,
				type: 'activate',
				expiresIn: activationToken.expiresIn,
				issuedAt: new Date(),
			});
			// TODO: URL /auth/activate/:token

			// Generate revoke token.
			const revokeToken = JWTUtils.createRevokeToken(payload);
			// Once the revoke token is created, we need to save it in the token collection.
			const newRevokeToken = await MongoConnector.create(tokenModel, {
				user: newUser._id,
				value: revokeToken,
				type: 'revoke',
				expiresIn: revokeToken.expiresIn,
				issuedAt: new Date(),
			});
			// TODO: URL /auth/revoke/:token

			// Response 200
			response.created('OK');
		} catch (err) {
			response.error(err);
		}
	}
}
