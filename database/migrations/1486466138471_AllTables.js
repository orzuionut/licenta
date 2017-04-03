'use strict'

const Schema = use('Schema')

class AllTablesTableSchema extends Schema {

    up() {
        this.create('users', (table) => {
            table.increments('id').primary();

            table.string('first_name').notNullable();
            table.string('last_name').notNullable();
            table.string('email').unique();
            table.string('password').notNullable();


            table.timestamps()
        });

        this.create('friends', (table) => {

            table.integer('user_id_1').unsigned()
            table.integer('user_id_2').unsigned()

            table.primary(['user_id_1', 'user_id_2'])

            table.foreign('user_id_1').references('users.id').onDelete('CASCADE')
            table.foreign('user_id_2').references('users.id').onDelete('CASCADE')


            table.timestamps()
        })

        this.create('conversations', (table) => {

            table.increments('id').primary()

            table.string('name')

            table.timestamps()
        })

        this.create('messages', (table) => {

            table.increments('id').primary()

            table.integer('conversation_id').unsigned()
            table.foreign('conversation_id').references('conversations.id').onDelete('CASCADE')

            table.integer('user_id').unsigned()
            table.foreign('user_id').references('users.id').onDelete('CASCADE')

            table.string('message').notNullable()

            table.timestamps()
        })

        // Convention for pivot table: table name is derived from the alphabetical order of the related model names
        this.create('conversation_user', (table) => {

            table.integer('user_id').unsigned()
            table.integer('conversation_id').unsigned()

            table.primary(['user_id', 'conversation_id'])

            table.foreign('user_id').references('users.id').onDelete('CASCADE')
            table.foreign('conversation_id').references('conversations.id').onDelete('CASCADE')


            table.timestamps()

        })

        this.create('files', (table) => {
            table.string('id').primary();

            table.string('name').notNullable();

            table.integer('user_sender_id').unsigned();
            table.foreign('user_sender_id').references('users.id').onDelete('CASCADE');

            table.timestamps()
        });

        this.create('file_receivers', (table) => {
            table.integer('user_id').unsigned();
            table.string('file_id');

            table.primary(['user_id', 'file_id']);

            table.foreign('user_id').references('users.id').onDelete('CASCADE');
            table.foreign('file_id').references('files.id');


            table.timestamps()
        });


    }

    down() {
        this.drop('file_receiver');
        this.drop('files');
        this.drop('conversation_user');
        this.drop('messages');
        this.drop('friends');
        this.drop('users');
        this.drop('conversations');
    }

}

module.exports = AllTablesTableSchema
