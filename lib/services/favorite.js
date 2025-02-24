'use strict';

const { Service } = require('@hapipal/schmervice');

module.exports = class FavoriteService extends Service {

    async addFavorite(favorite) {
        const { Favorite } = this.server.models();
        return await Favorite.query().insertAndFetch(favorite);

    }

    getFavoritesByUserId(user_id) {
        const { Favorite } = this.server.models();
        return Favorite.query().where('user_id', user_id).withGraphFetched('movie');
    }
    deleteFavoriteByUserId(params) {
        const { Favorite } = this.server.models();
        return Favorite.query().delete().where('user_id', params.id, 'movie_id', params.movie_id);
    }
};
