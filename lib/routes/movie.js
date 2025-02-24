'use strict';

const Joi = require('joi');

module.exports = [
    {
        method: 'GET',
        path: '/movies',
        options: {
            auth: {
                scope: ['admin', 'user']
            },
            tags: ['api']
        },
        handler: async (request, h) => {
            const { movieService } = request.services();
            return await movieService.getAll();
        }
    },
    {
        method: 'POST',
        path: '/movies',
        options: {
            auth: {
                scope: ['admin']
            },
            tags: ['api'],
            validate: {
                payload: Joi.object({
                    title: Joi.string().example('title').min(1).required(),
                    description: Joi.string().example('description').min(1).required(),
                    date: Joi.string().example('2004-27-10').min(1).required(),
                    director: Joi.string().example('director').min(1).required()
                })
            }
        },
        handler: async (request, h) => {
            const { movieService } = request.services();
            const movie = await movieService.create(request.payload);
            return h.response(movie).code(201);
        }
    },
    {
        method: 'PATCH',
        path: '/movies/{id}',
        options: {
            auth: {
                scope: ['admin']
            },
            tags: ['api'],
            validate: {
                params: Joi.object({
                    id: Joi.number().integer().required()
                }),
                payload: Joi.object({
                    title: Joi.string().min(1).required(),
                    description: Joi.string().min(1).required(),
                    date: Joi.string().min(1).required(),
                    director: Joi.string().min(1).required()
                })
            }
        },
        handler: async (request, h) => {
            const { movieService } = request.services();
            const movie = await movieService.modify(request.params.id, request.payload);
            return h.response(movie).code(200);
        }
    },
    {
        method: 'DELETE',
        path: '/movies/{id}',
        options: {
            auth: {
                scope: ['admin']
            },
            tags: ['api'],
            validate: {
                params: Joi.object({
                    id: Joi.number().integer().required()
                })
            }
        },
        handler: async (request, h) => {
            const { movieService } = request.services();
            await movieService.delete(request.params.id);
            return h.response().code(204);
        }
    }
];