'use strict';

class VoiceCallController
{
    * twoPeers(request, response)
    {
        const user = request.currentUser;
        const conversationID = request.param('id');
        const userIsAllowed = yield user.hasConversation(conversationID);

        if(userIsAllowed)
            yield response.sendView('pages/voiceCall/twoPeers');
        else
            response.send('Your are not allowed here. Get out! Redirect later to conversation');
    }

    * conference(request, response)
    {
        const user = request.currentUser;
        const conversationID = request.param('id');
        const userIsAllowed = yield user.hasConversation(conversationID);

        if(userIsAllowed)
            yield response.sendView('pages/voiceCall/conference');
        else
            response.send('Your are not allowed here. Get out! Redirect later to conversation');
    }
}

module.exports = VoiceCallController;
