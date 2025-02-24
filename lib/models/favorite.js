'use strict';

const Joi = require('joi');
const { Model } = require('@hapipal/schwifty');

module.exports = class Favorite extends Model {
    static get tableName() {
        return 'favorite';
    }

    static get joiSchema() {
        return Joi.object({
            id: Joi.number().integer().greater(0),
            user_id: Joi.number().integer().greater(0).required().description('User id'),
            movie_id: Joi.number().integer().greater(0).required().description('Movie id'),
            createdAt: Joi.date(),
            updatedAt: Joi.date()
        });
    }

    static get relationMappings() {
        const Movie = require('./movie'); // Adjust the path as necessary

        return {
            movie: {
                relation: Model.BelongsToOneRelation,
                modelClass: Movie,
                join: {
                    from: 'favorite.movie_id',
                    to: 'movie.id'
                }
            }
        };
    }

    $beforeInsert(queryContext) {
        this.createdAt = new Date();
        this.updatedAt = this.createdAt;
    }

    $beforeUpdate(opt, queryContext) {
        this.updatedAt = new Date();
    }
};