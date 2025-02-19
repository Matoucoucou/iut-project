'use strict';

// eslint-disable-next-line @hapi/hapi/capitalize-modules
const encrypt = require('@matoucoucou/encrypt');
const Joi = require('joi');

module.exports = [{
    method: 'get',
    path: '/user',
    options: {
        tags: ['api']
    },
    // eslint-disable-next-line @hapi/hapi/scope-start
    handler: async (request, h) => {
        const { userService } = request.services();

        return await userService.getAll();
    }
},{
    method: 'post',
    path: '/user',
    options: {
        tags: ['api'],
        validate: {
            payload: Joi.object({
                firstName: Joi.string().required().min(3).example('John').description('Firstname of the user'),
                lastName: Joi.string().required().min(3).example('Doe').description('Lastname of the user'),
                password: Joi.string().required().min(8).example('password').description('Password of the user'),
                email: Joi.string().required().min(8).email().example('john.doe@example.com').description('Email of the user'),
                username: Joi.string().required().min(3).example('johndoe').description('Username of the user')
            })
        }
    },
    handler: async (request, h) => {

        const { userService } = request.services();

        request.payload.password = await encrypt.sha1(request.payload.password);

        return await userService.create(request.payload);
    }
},{
    method: 'delete',
    path: '/user/{id}',
    options: {
        tags: ['api'],
        validate: {
            params: Joi.object({
                id: Joi.number().integer().required().description('ID of the user')
            })
        }
    },
    // eslint-disable-next-line @hapi/hapi/scope-start
    handler: async (request, h) => {
        const { userService } = request.services();
        const { id } = request.params;

        await userService.delete(id);
        return h.response().code(204);
    }
},{
    method: 'patch',
    path: '/user/{id}',
    options: {
        tags: ['api'],
        validate: {
            params: Joi.object({
                id: Joi.number().integer().required().description('ID of the user')
            }),
            payload: Joi.object({
                firstName: Joi.string().required().min(3).description('Firstname of the user'),
                lastName: Joi.string().required().min(3).description('Lastname of the user'),
                password: Joi.string().required().min(8).description('Password of the user'),
                email: Joi.string().required().min(8).email().description('Email of the user'),
                username: Joi.string().required().min(3).description('Username of the user')
            })
        }
    },
    // eslint-disable-next-line @hapi/hapi/scope-start
    handler: async (request, h) => {
        const { userService } = request.services();
        const { id } = request.params;
        const user = { ...request.payload, id };

        await userService.modify(user);
        return h.response().code(204);
    }
},{
    method: 'post',
    path: '/user/login',
    options: {
        tags: ['api'],
        validate: {
            payload: Joi.object({
                email: Joi.string().required().email().description('Email of the user'),
                password: Joi.string().required().min(8).description('Password of the user')
            })
        }
    },
    handler: async (request, h) => {
        const { userService } = request.services();
        const { email, password } = request.payload;

        try {
            const user = await userService.login(email, password);
            return h.response({ login: 'successful' }).code(200);
        } catch (err) {
            return h.response({ error: err.message }).code(401);
        }
    }
}];
