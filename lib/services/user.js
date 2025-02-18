'use strict';

const { Service } = require('@hapipal/schmervice');

module.exports = class UserService extends Service {

    create(user) {

        const { User } = this.server.models();

        return User.query().insertAndFetch(user);
    }

    delete(id) {
        const { User } = this.server.models();
        return User.query().deleteById(id);
    }

    // eslint-disable-next-line @hapi/hapi/scope-start
    getAll() {
        const { User } = this.server.models();
        return User.query();
    }
};
