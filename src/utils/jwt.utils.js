const jwt = require('jsonwebtoken');
const CONFIG = require('../config/config');
const DateUtils = require('./date.Utils');

class JWTUtils {
	//static variables to standardize the errors that can be thrown
	static EXPIRED_ERROR = 'TokenExpiredError';
	static MALFORMED_ERROR = 'JsonWebTokenError';
	static UNKNOWN_ERROR = 'UnknownError';

	static createAuthToken(payload) {
		return generateToken(
			payload,
			CONFIG.JWT_LOGIN_SECRET,
			DateUtils.inMilliseconds('1d'),
		);
	}

	static createRefreshToken(payload) {
		return generateToken(
			payload,
			CONFIG.JWT_REFRESH_SECRET,
			DateUtils.inMilliseconds('3m'),
		);
	}

	static createRevokeToken(payload) {
		return generateToken(
			payload,
			CONFIG.JWT_REVOKE_SECRET,
			DateUtils.inMilliseconds('3d'),
		);
	}

	static createRecoveryToken(payload) {
		return generateToken(
			payload,
			CONFIG.JWT_RECOVERY_SECRET,
			DateUtils.inMilliseconds('1d'),
		);
	}

	static createActivateToken(payload) {
		return generateToken(
			payload,
			CONFIG.JWT_ACTIVATE_SECRET,
			DateUtils.inMilliseconds('3d'),
		);
	}

	static validateAuthToken(token) {
		return validateToken(token, CONFIG.JWT_LOGIN_SECRET);
	}

	static validateRefreshToken(token) {
		return validateToken(token, CONFIG.JWT_REFRESH_SECRET);
	}

	static validateRevokeToken(token) {
		return validateToken(token, CONFIG.JWT_REVOKE_SECRET);
	}

	static validateRecoveryToken(token) {
		return validateToken(token, CONFIG.JWT_RECOVERY_SECRET);
	}

	static validateActivateToken(token) {
		return validateToken(token, CONFIG.JWT_ACTIVATE_SECRET);
	}
	static genAuthPayload(user) {
		return {
			userId: user._id,
			role: user.role,
			expiredIn: user.expired, // ? 
			issuedAt: user.issuedAt, // ? 
		};
	}
}

module.exports = JWTUtils;

/**
 * Function to generate tokens
 * @param {*} payload
 * @param {string} signature Signature created for that specific token
 * @param {*} expiresIn Token validity time
 * @returns a token
 */
function generateToken(payload, signature, expiresIn) {
	const data = {
		token: jwt.sign(payload, signature, { expiresIn: expiresIn }),
		expiresIn: new Date(new Date().getTime() + expiresIn),
		issuedAt: new Date(),
	};

	return data;
}

/**
 *
 * @param {*} token
 * @param {string} signature Signature created for that specific token
 * @returns an object with the validation and the payload if it is valid or the errors and the reason for it if not
 */
function validateToken(token, signature) {
	const results = {
		success: false,
		payload: undefined,
		reason: undefined,
		error: undefined,
	};
	try {
		const payload = jwt.verify(token, signature);
		results.success = true;
		results.payload = payload;
	} catch (error) {
		if (
			error.name === JWTUtils.EXPIRED_ERROR ||
			error.name === JWTUtils.MALFORMED_ERROR
		) {
			results.reason = error.name;
		} else {
			results.reason = JWTUtils.UNKNOWN_ERROR;
		}
		results.error = error;
	}
	return results;
}
