'use strict';

const User = use('App/Model/User');
const Conversation = use('App/Model/Conversation');
const ConversationUser = use('App/Model/ConversationUser');
const Message = use('App/Model/Message');

class ConversationController {

  * index(request, response) 
  {
    const user = request.currentUser;

    let conversations = yield user.conversations().fetch();

    // Workaround to sendThroughDataChannel array to view. TODO: fix this
    const json = JSON.stringify(conversations);
    conversations = JSON.parse(json) ;


    yield response.sendView('pages/conversation/index', { conversations: conversations })

  }

  * call(request, response)
  {
      const conversationID = request.param('id');
      const conversation = yield Conversation.find(conversationID);

      const nrOfParticipantsInConversation = yield conversation.getNrOfParticipants();

      if(nrOfParticipantsInConversation > 2) {
          yield response.redirect('/conference/' + conversationID);              
      } else {
          yield response.redirect('/videocall/' + conversationID);
      }

  }

  * create(request, response) {
    //
  }

  * store(request, response) 
  {
      
  }

  * show(request, response) {
    //
  }

  * edit(request, response) {
    //
  }

  * update(request, response) {
    //
  }

  * destroy(request, response) {
    //
  }


}

module.exports = ConversationController;
