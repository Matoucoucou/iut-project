'use strict';

module.exports = {

    async up(knex) {

        await knex.schema.createTable('favorite', (table) => {
            table.increments('id').primary();
            table.integer('movie_id').unsigned().notNull();
            table.foreign('movie_id').references('movie.id');
            table.integer('user_id').unsigned().notNull();
            table.foreign('user_id').references('user.id');
            table.dateTime('createdAt').notNull().defaultTo(knex.fn.now());
            table.dateTime('updatedAt').notNull().defaultTo(knex.fn.now());
        });
    },

    async down(knex) {

        await knex.schema.dropTableIfExists('favorite');
    }
};

