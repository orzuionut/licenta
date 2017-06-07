'use strict';

class VideocallController
{
    *show(request, response)
    {
      const user = request.currentUser;
      const conversationID = request.param('id');
      const userIsAllowed = yield user.hasConversation(conversationID);

      if(userIsAllowed)
          yield response.sendView('pages/videocall/show');
      else
         response.send('Your are not allowed here. Get out! Redirect later to conversation');
    }
}

module.exports = VideocallController;
