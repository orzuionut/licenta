'use strict'

const User = use('App/Model/User')
const Friend = use('App/Model/Friend')

class FriendController {

  * index(request, response)
  {
      const currentUser = request.currentUser
      let friends = yield currentUser.friends().fetch()

      // Workaround to send array to view. TODO: fix this
      const json_friends = JSON.stringify(friends)
      friends = JSON.parse(json_friends) 

      yield response.sendView('pages/friends/index', { friends: friends });
  }

  * create(request, response) 
  {
      
  }

  * store(request, response) 
  {
    //
  }

  * show(request, response) 
  {
    
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

module.exports = FriendController
