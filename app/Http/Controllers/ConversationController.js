'use strict';

const User = use('App/Model/User');
const Conversation = use('App/Model/Conversation');
const ConversationUser = use('App/Model/ConversationUser');
const Message = use('App/Model/Message');

class ConversationController
{
    * index(request, response)
    {
        const user = request.currentUser;

        let conversations = yield user.conversations().with('users').fetch();

        // Workaround to send array to view. TODO: fix this
        const json = JSON.stringify(conversations);
        conversations = JSON.parse(json);
        
        yield response.sendView('pages/conversation/index', {conversations: conversations})
    }

    * call(request, response)
    {
        const conversationID = request.param('id');
        const conversation = yield Conversation.find(conversationID);

        const nrOfParticipantsInConversation = yield conversation.getNrOfParticipants();

        if (nrOfParticipantsInConversation > 2)
        {
            yield response.redirect('/conference/' + conversationID);
        }
        else
        {
            yield response.redirect('/videocall/' + conversationID);
        }
    }

    * cinema(request, response)
    {
        const conversationID = request.param('id');
        yield response.redirect('/cinema/' + conversationID);
    }

    * friends (request, response)
    {
        const currentUser = request.currentUser;
        let friends = yield currentUser.friends();

        yield response.send(friends);
    }

    * store(request, response)
    {
        let name = request.input('c-conv-name');
        let participants = request.input('c-conv-friends');
        participants.push(request.currentUser.id);

        let newConversation = new Conversation();
        newConversation.name = name;
        yield newConversation.save();

        yield newConversation.users().attach(participants);

        yield response.redirect('/conversation');
    }

    * destroy (request, response)
    {
        const id = request.param('id');

        const conversation = yield Conversation.find(id);

        yield conversation.delete();

        response.send("OK");
    }
}

module.exports = ConversationController;
