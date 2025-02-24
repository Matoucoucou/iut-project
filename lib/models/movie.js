'use strict';

const Joi = require('joi');
const { Model } = require('@hapipal/schwifty');

module.exports = class Movie extends Model {
    static get tableName() {
        return 'movie';
    }

    static get joiSchema() {
        return Joi.object({
            id: Joi.number().integer().greater(0),
            title: Joi.string().min(1).required().description('Title of the movie'),
            description: Joi.string().min(1).required().description('Description of the movie'),
            date: Joi.string().min(1).required().description('Date of the movie'),
            director: Joi.string().min(1).required().description('Director of the movie'),
            createdAt: Joi.date(),
            updatedAt: Joi.date()
        });
    }

    $beforeInsert(queryContext) {
        this.createdAt = new Date();
        this.updatedAt = this.createdAt;
    }

    $beforeUpdate(opt, queryContext) {
        this.updatedAt = new Date();
    }
};