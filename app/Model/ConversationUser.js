'use strict';

const Lucid = use('Lucid');

class ConversationUser extends Lucid
{
    static get table ()
    {
        return 'conversation_user'
    }
}

module.exports = ConversationUser;
