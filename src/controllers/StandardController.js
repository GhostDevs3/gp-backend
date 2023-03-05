/**
 * @author iRaphiki
 * @modified
 */
import MongoConnector from '../utils/mongo.connector';
import HTTPResponse from '../utils/http.response';

/**
 * Father class to standard controllers methods.
 */
class StandardController {
    /**
     * @constructor Initial base in a model parameter.
     * @param {import('mongoose').Models} model
     */
    constructor(model) {
        this.model = model;
    }

    /**
     * Find method
     * @param { import('express').Request } req
     * @param { import('express').Response } res
     * @returns response method depending on data instance.
     */
    async find(req, res) {
        const response = new HTTPResponse(res);
        try {
            const data = await MongoConnector.find(model, req.query);
            if (data) {
                return response.success('Data found', data);
            } else {
                return response.notFound('Data not found');
            }
        } catch (err) {
            console.log(err);
        }
    }
    /**
     * Get by id method
     * @param { import('express').Request } req
     * @param { import('express').Response } res
     * @returns response method depending on data instance.
     */
    async getById(req, res) {
        const response = new HTTPResponse(res);
        try {
            const data = await MongoConnector.findById(model, req.params.id);
            if (data) {
                return response.success('Data by id found', data);
            } else {
                return response.notFound('Data by id not found');
            }
        } catch (err) {
            console.log(err);
        }
    }
    /**
     * CreateOne method
     * @param { import('express').Request } req
     * @param { import('express').Response } res
     * @returns response method depending on data instance.
     */
    async createOne(req, res) {
        const response = new HTTPResponse(res);
        try {
            const data = await MongoConnector.create(model, req.query);
            if (data) {
                return response.success('Data create', data);
            } else {
                return response.notFound('Data not found');
            }
        } catch (err) {
            console.log(err);
        }
    }
    /**
     * Update by id method
     * @param { import('express').Request } req
     * @param { import('express').Response } res
     * @returns response method depending on data instance.
     */
    async updateById(req, res) {
        const response = new HTTPResponse(res);
        try {
            const data = await MongoConnector.updateById(
                model,
                req.query.id,
                req.query,
            );
            if (data) {
                return response.success('Data updated by id', data);
            } else {
                return response.notFound('Data not updated by id');
            }
        } catch (err) {
            console.log(err);
        }
    }
    /**
     * Delete by id method
     * @param { import('express').Request } req
     * @param { import('express').Response } res
     * @returns response method depending on data instance.
     */
    async deleteById(req, res) {
        const response = new HTTPResponse(res);
        try {
            const data = await MongoConnector.deleteById(model, req.query.id);
            if (data) {
                return response.success('Data deleted by id', data);
            } else {
                return response.notFound('Data not deleted by id');
            }
        } catch (err) {
            console.log(err);
        }
    }
}
