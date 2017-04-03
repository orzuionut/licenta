'use strict';

const Lucid = use('Lucid');

class Conversation extends Lucid {

	users()
	{
		return this.belongsToMany('App/Model/User', 'conversation_user', 'conversation_id', 'user_id');
	}

	messages()
	{
		return this.hasMany('App/Model/Message');
	}

	* getNrOfParticipants()
	{
		let users = yield this.users().fetch();

		const json = JSON.stringify(users);
    	users = JSON.parse(json);

    	return users.length;
	}
	
}

module.exports = Conversation;
