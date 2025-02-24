'use strict';

const { Service } = require('@hapipal/schmervice');

module.exports = class MovieService extends Service {

    // eslint-disable-next-line @hapi/hapi/scope-start
    async create(movie) {
        const { Movie } = this.server.models();
        return await Movie.query().insertAndFetch(movie);
    }

    // eslint-disable-next-line @hapi/hapi/scope-start
    async modify(id, movie) {
        const { Movie } = this.server.models();
        return await Movie.query().patchAndFetchById(id, movie);
    }

    // eslint-disable-next-line @hapi/hapi/scope-start
    async delete(id) {
        const { Movie } = this.server.models();
        return await Movie.query().deleteById(id);
    }

    // eslint-disable-next-line @hapi/hapi/scope-start
    async getAll() {
        const { Movie } = this.server.models();
        return await Movie.query();
    }

    async getById(id) {
        const { Movie } = this.server.models();
        return await Movie.query().findById(id);
    }
};
