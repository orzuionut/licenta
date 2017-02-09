'use strict'

const Lucid = use('Lucid')

class User extends Lucid {

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

    friends()
    {
    	return this.belongsToMany('App/Model/User', 'friends', 'user_id_1', 'user_id_2');
    }

    conversations()
    {
    	return this.belongsToMany('App/Model/Conversation', 'conversation_user', 'user_id', 'conversation_id');
    }

    isParticipant(conversationID)
    {
    	const value = this.conversations().where('conversation_id', conversationID).fetch();

    	if(value)
    	{
    		return true;
    	}

    	return false;
    }


    getFullName()
    {
    	return this.first_name + ' ' + this.last_name;
    }

}

module.exports = User
