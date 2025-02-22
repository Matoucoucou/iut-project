'use strict';

// eslint-disable-next-line @hapi/hapi/capitalize-modules
const encrypt = require('@matoucoucou/encrypt');
const { Service } = require('@hapipal/schmervice');
const Jwt = require('@hapi/jwt');

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
        const token = Jwt.token.generate(
            {
                aud: 'urn:audience:iut',
                iss: 'urn:issuer:iut',
                firstName: user.firstName,
                lastName: user.lastName,
                email: user.email,
                username: user.username,
                scope: user.scope },
            {
                key: 'cake', // La clé qui est définit dans lib/auth/strategies/jwt.js
                algorithm: 'HS512'
            },
            {
                ttlSec: 14400 // 4 hours
            }
        );

        if (!user) {
            throw new Error('Utilisateur non trouvé');
        }

        const isValidPassword = await encrypt.compareSha1(password, user.password);
        if (!isValidPassword) {
            throw new Error('Mot de passe incorrect');
        }

        return token;
    }
};
