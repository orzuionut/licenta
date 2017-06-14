'use strict';

class CinemaController
{
    * show(request, response)
    {
        const user = request.currentUser;
        const conversationID = request.param('id');
        const userIsAllowed = yield user.hasConversation(conversationID);

        if(userIsAllowed)
            yield response.sendView('pages/cinema/show');
        else
            response.redirect('back');
    }
}

module.exports = CinemaController;
