'use strict'

const Lucid = use('Lucid')

class Friend extends Lucid {


	user()
	{
		return this.belongTo('App/Model/User');
	}

}

module.exports = Friend
