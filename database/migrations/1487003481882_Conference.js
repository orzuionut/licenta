'use strict'

const Schema = use('Schema')

class ConferenceTableSchema extends Schema {

  up () {
    this.create('conferences', (table) => {
       	table.increments('id').primary()

		table.string('name')
    })
  }

  down () {
    this.drop('conferences')
  }

}

module.exports = ConferenceTableSchema
