'use strict';

class Guest
{
  * handle (request, response, next)
  {
    if(! request.currentUser)
    {
        yield next
    }

    response.redirect('conversation');
  }
}

module.exports = Guest;
