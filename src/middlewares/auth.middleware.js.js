const HTTPResponse = require("../utils/http.response");
const JWTUtils = require("../utils/jwt.utils");

class AuthMiddleware {
    /**
     *Method to verify de authorization
     * @param {import("express").Request} req Request
     * @param {import("express").Response} res Response
     * @param {*} next function to move to the next middleware
     */
    static run(req, res, next) {
        const response = new HTTPResponse(res);

        const authHeaders = req.headers["Authorization"];
        if (!authHeaders) {
            return response.badRequest("Auth headers Missing", "undefined");
        }
        //Validate token
        const tokenValidation = JWTUtils.validateAuthToken(authHeaders);
        if (tokenValidation.success) {
            req.payload = tokenValidation.payload;
            next();
        } else {
            if (tokenValidation.reason === JWTUtils.EXPIRED_ERROR) {
                return response.unauthorized("Expired token");
            } else if (tokenValidation.reason === JWTUtils.MALFORMED_ERROR) {
                return response.badRequest("Malformed token", "MALFORMED");
            } else {
                return response.error(
                    "Unknown error",
                    "UNKNOWN",
                    tokenValidation.error
                );
            }
        }
    }
}
module.exports = AuthMiddleware;
