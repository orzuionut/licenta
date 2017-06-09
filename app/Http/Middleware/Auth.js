'use strict';

class Auth
{
    * handle (request, response, next)
    {
        if ( request.currentUser )
        {
            yield next
        }

        response.redirect('login');
    }

}

module.exports = Auth;
