'use strict';

// eslint-disable-next-line @hapi/hapi/capitalize-modules
const encrypt = require('@matoucoucou/encrypt');
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

    getById(id) {
        const { User } = this.server.models();
        return User.query().findById(id);
    }

    modify(user) {
        const { User } = this.server.models();
        return User.query().patchAndFetchById(user.id, user);
    }

    // eslint-disable-next-line @hapi/hapi/scope-start
    async login(email, password) {
        const { User } = this.server.models();
        const user = await User.query().findOne({ email });

        if (!user) {
            throw new Error('Utilisateur non trouvé');
        }

        const isValidPassword = await encrypt.compareSha1(password, user.password);
        if (!isValidPassword) {
            throw new Error('Mot de passe incorrect');
        }

        return user;
    }
};
