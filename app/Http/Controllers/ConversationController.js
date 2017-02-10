'use strict'

const User = use('App/Model/User');
const Conversation = use('App/Model/Conversation');
const ConversationUser = use('App/Model/ConversationUser');
const Message = use('App/Model/Message');

class ConversationController {

  * index(request, response) 
  {
    const user = request.currentUser;

    let conversations = yield user.conversations().fetch();

    // Workaround to send array to view. TODO: fix this
    const json = JSON.stringify(conversations)
    conversations = JSON.parse(json) 


    yield response.sendView('pages/conversation/index', { conversations: conversations })

  }

  * ajax(request, response)
  {
      const user = request.currentUser;

      const conversationID = request.input('conversationID');

      // console.log(user.isParticipant(conversationID));

      const conversation = yield Conversation.find(conversationID);

      //TODO: Refactor this using :conversation:

      const messages = yield conversation.messages().fetch();

      // Workaround to send array to view. TODO: fix this
      const json = JSON.stringify(messages)
      let build_messages = JSON.parse(json)

      for(var i = 0; i < build_messages.length; i = i + 1)
      {
        let message_user_id = build_messages[i].user_id;

        let message_user = yield User.find(message_user_id);

        build_messages[i].user_name = message_user.getFullName();
      }

      yield response.json({
          messages: build_messages,
          currentUser: user
      });

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

module.exports = ConversationController
