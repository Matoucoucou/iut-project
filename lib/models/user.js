'use strict';

const Joi = require('joi');
const { Model } = require('@hapipal/schwifty');

module.exports = class User extends Model {
    static get jsonAttributes() {

        return ['scope'];
    }

    static get tableName() {

        return 'user';
    }

    static get joiSchema() {

        return Joi.object({
            id: Joi.number().integer().greater(0),
            firstName: Joi.string().min(3).example('John').description('Firstname of the user'),
            lastName: Joi.string().min(3).example('Doe').description('Lastname of the user'),
            email: Joi.string().min(8).email().example('john.doe@example.com').description('Email of the user'),
            password: Joi.string().min(8).example('password').description('Password of the user'),
            username: Joi.string().min(3).example('johndoe').description('Username of the user'),
            scope: Joi.string().valid('admin', 'user').default('user'),
            createdAt: Joi.date(),
            updatedAt: Joi.date()
        });
    }

    $beforeInsert(queryContext) {

        this.updatedAt = new Date();
        this.createdAt = this.updatedAt;
        this.scope = this.scope || 'user'; // Définit le rôle par défaut à 'user' si non spécifié

    }

    $beforeUpdate(opt, queryContext) {

        this.updatedAt = new Date();
    }

};
