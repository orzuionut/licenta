'use strict'

const Lucid = use('Lucid')

class Message extends Lucid
{
	conversation()
	{
		return this.belongsTo('App/Model/Conversation');
	}

	user()
	{
		return this.belongsTo('App/Model/User');
	}

}

module.exports = Message
