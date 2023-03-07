const HTTPResponse = require('../utils/http.response');
const JWTUtils = require('../utils/jwt.utils');
const MongoConnector = require('../utils/mongo.connector');

class AuthMiddleware {
    /**
     * Method to verify de authorization
     * @param {import("express").Request} req Request
     * @param {import("express").Response} res Response
     * @param {*} next function to move to the next middleware
     */
    static run(req, res, next) {
        const response = new HTTPResponse(res);

        const authHeaders = req.headers['Authorization'];
        if (!authHeaders) {
            return response.badRequest(
                'Auth headers Missing',
                'AUTH_HEADERS_MISSING',
            );
        }
        try {
            //Validate token
            const tokenValidation = JWTUtils.validateAuthToken(authHeaders);
            if (tokenValidation.success) {
                req.payload = tokenValidation.payload;

                //Check that the token exists in the db with the token value comparing from the one that arrives in the headers
                const token = MongoConnector.findOne(TokenModel, {
                    value: authHeaders,
                });
                if (!token) {
                    return response.notFound('User not found');
                }
                //Check the user exists with the id that comes in the tokenValidation payload.
                const user = MongoConnector.findById(
                    UserModel,
                    tokenValidation.payload._id,
                );
                if (!user) {
                    return response.notFound('User not found');
                }
                req.user = user;
                next();
            } else {
                if (tokenValidation.reason === JWTUtils.EXPIRED_ERROR) {
                    return response.unauthorized('Expired token');
                } else if (
                    tokenValidation.reason === JWTUtils.MALFORMED_ERROR
                ) {
                    return response.badRequest('Malformed token', 'MALFORMED');
                } else {
                    return response.error(
                        'Unknown error',
                        'UNKNOWN',
                        tokenValidation.error,
                    );
                }
            }
        } catch (error) {
            console.log(error);
            return response.error('Unknown error', 'UNKNOWN', error);
        }
    }
}
module.exports = AuthMiddleware;
