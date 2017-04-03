'use strict'

const Lucid = use('Lucid')

class Friend extends Lucid 
{
	static get primaryKey ()
	{
		return ['user_id_1', 'user_id_2'];
	}

	user()
	{
		return this.belongTo('App/Model/User');
	}
}

module.exports = Friend;
