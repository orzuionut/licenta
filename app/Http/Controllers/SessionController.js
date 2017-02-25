'use strict'

class SessionController {

  * index(request, response) 
  {
      yield response.sendView('pages/auth/login/index')  
  }

  * store(request, response)
   {
      const email = request.input('email')
      const password = request.input('password')

      try 
      {
          yield request.auth.attempt(email, password)

      } catch (e) 
      {
          yield request
            .withAll()
            .andWith({ error: e.message })
            .flash()

          response.redirect('back')
      }

      response.redirect('/home');
  }

  * destroy(request, response) {
      yield request.auth.logout()

      return response.redirect('/')
  }

}

module.exports = SessionController;
