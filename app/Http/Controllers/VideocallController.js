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
          response.redirect('back');
    }
}

module.exports = VideocallController;
