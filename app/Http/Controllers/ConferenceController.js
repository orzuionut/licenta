'use strict';

class ConferenceController {

  * index(request, response) 
  {
      // const user = request.currentUser;

      // let conferences = yield user.conferences().fetch();

      // // Workaround to sendThroughDataChannel array to view. TODO: fix this
      // const json = JSON.stringify(conferences)
      // conferences = JSON.parse(json) 


      // yield response.sendView('pages/conferences/index', { conferences: conferences })

      yield response.sendView('pages/conferences/index');
  }

  * create(request, response) {
    //
  }

  * store(request, response) 
  {
 
  }

  * show(request, response)
  {
      const user = request.currentUser;

      const conversationID = request.param('id');

      const userIsAllowed = yield user.hasConversation(conversationID);

      if(userIsAllowed)
      {
          yield response.sendView('pages/conferences/show');

      } else
      {
         response.sendThroughDataChannel('Your are not allowed here. Get out! Redirect later to conversation');
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

module.exports = ConferenceController;
