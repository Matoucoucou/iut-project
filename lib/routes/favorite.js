'use strict';

// eslint-disable-next-line @hapi/hapi/capitalize-modules
const Joi = require('joi');

module.exports = [{
    method: 'POST',
    path: '/user/favorites',
    options: {
        auth: {
            scope: ['user']
        },
        tags: ['api'],
        validate: {
            payload: Joi.object({
                user_id: Joi.number().integer().required(),
                movie_id: Joi.number().integer().required()
            })
        }
    },
    handler: async (request, h) => {
        const { favoriteService } = request.services();
        const favorite = await favoriteService.addFavorite(request.payload);
        return h.response(favorite).code(201);
    }
},
{
    method: 'GET',
    path: '/user/{id}/favorites',
    options: {
        auth: {
            scope: ['user', 'admin']
        },
        tags: ['api'],
        validate: {
            params: Joi.object({
                user_id: Joi.number().integer().required()
            })
        }
    },
    handler: async (request, h) => {
        const { favoriteService } = request.services();
        const favorites = await favoriteService.getFavoritesByUserId(request.params.user_id);
        return h.response(favorites).code(200);
    }
}];
