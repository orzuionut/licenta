'use strict'

const User = use('App/Model/User');

class ProfileController
{
  * show(request, response)
  {
      const id = request.param('id');

      let user = yield User.query().where('id', id).fetch()

      yield response.sendView('pages/profile/show', { user: user.toJSON() })
  }
}

module.exports = ProfileController
