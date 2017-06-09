'use strict';

const Conversation = use('App/Model/Conversation');
const ConversationUser = use('App/Model/ConversationUser');
const Database = use('Database');

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

Friendship.delete = function * (data)
{
    /**
     * Find the conversation associated with the two users that are no longer friends.
     * Delete it, and on cascade the users and the conversation will be deleted from table "conversation_user"
     */

    const conversation = yield Database.table('conversation_user AS cu1')
        .innerJoin('conversation_user AS cu2', 'cu1.conversation_id', 'cu2.conversation_id')
        .where('cu1.user_id', data.user_id_1)
        .where('cu2.user_id', data.user_id_2);

    yield Conversation
        .query()
        .where('id', conversation[0].conversation_id)
        .delete();
};
