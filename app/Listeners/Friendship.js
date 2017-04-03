'use strict';

const Conversation = use('App/Model/Conversation');
const ConversationUser = use('App/Model/ConversationUser');

const Friendship = exports = module.exports = {}

Friendship.new = function * (data)
{
    /**
     * Create a new conversation and add the 2 users to it
     */
    let newConversation = new Conversation();
    newConversation.name = null;
    yield newConversation.save();

    yield newConversation.users().attach([data.user_id_1, data.user_id_2]);
};
