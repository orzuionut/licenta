'use strict'

class ConferenceController {

  * index(request, response) 
  {
      const user = request.currentUser;

      let conferences = yield user.conferences().fetch();

      // Workaround to send array to view. TODO: fix this
      const json = JSON.stringify(conferences)
      conferences = JSON.parse(json) 


      yield response.sendView('pages/conferences/index', { conferences: conferences })
  }

  * create(request, response) {
    //
  }

  * store(request, response) {
    //
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

module.exports = ConferenceController
