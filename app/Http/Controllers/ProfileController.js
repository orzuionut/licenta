'use strict'

const User = use('App/Model/User');

class ProfileController
{
  * show(request, response)
  {
      const id = request.param('id');

      let user = yield User.query().where('id', id).fetch()

      // Workaround to sendThroughDataChannel array to view. TODO: fix this
      const json_user = JSON.stringify(user)
      user = JSON.parse(json_user) 

      yield response.sendView('pages/profile/show', { user: user[0] })
  }

}

module.exports = ProfileController
