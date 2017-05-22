'use strict'

const Lucid = use('Lucid')

class User extends Lucid
{
	static boot()
	{
		super.boot();

		this.addHook('beforeCreate', 'User.encryptPassword');
	}

	static get rules() 
	{
		return {
			'first_name': 'required|min:2',
			'last_name': 'required|min:2',
			'email': 'required|email|unique:users, email',
			'password': 'required|min:6'
	
		}
    }

    * friends()
    {
		const friends_first = yield this.friendsFirst().fetch();
		const friends_second = yield this.friendsSecond().fetch();

		return friends_first.toJSON().concat(friends_second.toJSON());
    }
	
	* friendById(id)
	{
		const friends_first = yield this.friendsFirst().where('id', id).fetch();
		const friends_second = yield this.friendsSecond().where('id', id).fetch();

		return friends_first.toJSON().concat(friends_second.toJSON());
	}
	
	friendsFirst()
	{
		return this.belongsToMany('App/Model/User', 'friends', 'user_id_1', 'user_id_2');
	}
	
	friendsSecond()
	{
		return this.belongsToMany('App/Model/User', 'friends', 'user_id_2', 'user_id_1');
	}

    conversations()
    {
    	return this.belongsToMany('App/Model/Conversation', 'conversation_user', 'user_id', 'conversation_id');
    }

    * hasConversation(conversation_id)
    {
    	let value = yield this.conversations().where('conversation_id', conversation_id).fetch();

        // Workaround to sendThroughDataChannel array to view. TODO: fix this
        const json = JSON.stringify(value)
        value = JSON.parse(json) 

    	return value.length > 0;
    }

	filesToReceive()
	{
		return this.belongsToMany('App/Model/File', 'file_receivers', 'user_id', 'file_id');
	}

    getFullName()
    {
    	return this.first_name + ' ' + this.last_name;
    }

}

module.exports = User
