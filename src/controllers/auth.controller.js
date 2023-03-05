/**
 * @author iRaphiki
 * @modified
 */
import HTTPResponse from '../utils/http.response';
import MongoConnector from '../utils/mongo.connector';
import StandardController from './StandardController';
import { userModel } from '../models/user.model';

class AuthController extends StandardController {
    constructor() {
        super(userModel);
    }

    async signup(req, res) {
        const response = new HTTPResponse(res);
        try {
            const { username, email, password } = req.body;
            const user = await MongoConnector.findOne(userModel, {
                email: email,
            });
            if (!username || !email || !password) {
                return response.badRequest(
                    'Wrong user data',
                    'USER_DATA_EMPTY',
                    { username, email, password },
                );
            }
            if (password) {
                const pattern = RegExp(
                    '^(?=.*d)(?=.*[a-z])(?=.*[A-Z])(?=.*[a-zA-Z]).{8,}$',
                );
                if (!pattern.match(password)) {
                    return response.badRequest(
                        'Wrong password pattern',
                        'WRONG_PATTERN',
                        undefined,
                    );
                }
            }
            if (user) {
                return response.conflict(
                    'User already exists.',
                    'USER_ALREADY_EXISTS',
                    undefined,
                );
            }
        } catch (err) {
            console.log(err);
        }
    }
}
