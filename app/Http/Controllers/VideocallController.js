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
          let files = yield user.filesToReceive().fetch();

          // Workaround to sendThroughDataChannel array to view. TODO: fix this
          const json = JSON.stringify(files);
          files = JSON.parse(json);
          
          yield response.sendView('pages/videocall/show', { files: files });

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
