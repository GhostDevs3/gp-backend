/**
 * @author VeroniKa
 * @modified
 */
const ProgrammingLanguageModel = require('../models/programmingLanguage.model');
const StandardController = require('../controllers/StandardController');
const HTTPResponse = require('../utils/http.response');

class ProgrammingLanguageController extends StandardController {
    constructor() {
        super(ProgrammingLanguageModel);
    }

    /**
     * Method to create a new programming language. This action is only allowed to administrator users.
     * @param {import('express').Request} req request data
     * @param {import('express').Response} res response data
     * @returns the response json object with the corresponding data.
     */
    async createOne(req, res) {
        const response = HTTPResponse(res);
        try {
            const user = req.user;
            if (!user.isAdmin()) {
                return response.unauthorized(
                    'You are not authorized to perform this action.',
                );
            }
            return super.createOne(req, res);
        } catch (error) {
            console.log(error);
            return response.error(
                'Unknown error at create record',
                'UNKNOWN_ERROR',
                error,
            );
        }
    }
    /**
     * Method to update a programming language record. This action is only allowed to administrator users.
     * @param {import('express').Request} req request data
     * @param {import('express').Response} res response data
     * @returns the response json object with the corresponding data.
     */
    async updateById(req, res) {
        const response = HTTPResponse(res);
        try {
            const user = req.user;
            if (!user.isAdmin()) {
                return response.unauthorized(
                    'You are not authorized to perform this action.',
                );
            }
            return super.updateById(req, res);
        } catch (error) {
            console.log(error);
            return response.error(
                'Unknown error at update record',
                'UNKNOWN_ERROR',
                error,
            );
        }
    }
    /**
     * Method to delete a programming language record. This action is only allowed to administrator users.
     * @param {import('express').Request} req request data
     * @param {import('express').Response} res response data
     * @returns the response json object with the corresponding data.
     */
    async deleteById(req, res) {
        const response = HTTPResponse(res);
        try {
            const user = req.user;
            if (!user.isAdmin()) {
                return response.unauthorized(
                    'You are not authorized to perform this action.',
                );
            }
            return super.deleteById(req, res);
        } catch (error) {
            console.log(error);
            return response.error(
                'Unknown error at delete record',
                'UNKNOWN_ERROR',
                error,
            );
        }
    }
}
module.exports = ProgrammingLanguageController;
