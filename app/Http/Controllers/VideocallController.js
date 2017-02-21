'use strict';

class VideocallController {

  * index(request, response) {
    

    yield response.sendView('pages/videocall/index');
  }

  * create(request, response) {
    //
  }

  * store(request, response) {
    //
  }

  * show(request, response)
  {
      const user = request.currentUser;

      const conversationID = request.param('id');

      const userIsAllowed = yield user.hasConversation(conversationID);

      if(userIsAllowed)
      {
          yield response.sendView('pages/videocall/show');

      } else
      {
         response.send('Your are not allowed here. Get out! Redirect later to conversation');
      }

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

module.exports = VideocallController;
