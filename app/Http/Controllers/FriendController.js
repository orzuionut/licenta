'use strict'

const Event = use('Event');
const User = use('App/Model/User');
const Friend = use('App/Model/Friend');

class FriendController {

    * index(request, response)
    {
        const currentUser = request.currentUser;
        let friends = yield currentUser.friends().fetch();

        // Workaround to sendThroughDataChannel array to view. TODO: fix this
        const json_friends = JSON.stringify(friends);
        friends = JSON.parse(json_friends);

        yield response.sendView('pages/friends/index', {persons: friends});
    }

    * store(request, response)
    {
        const user_1_id = request.all().id;
        const user_2_id = request.currentUser.id;

        let newFriendship = new Friend();
        newFriendship.user_id_1 = user_1_id;
        newFriendship.user_id_2 = user_2_id;
        yield newFriendship.save();

        Event.fire('friendship.new', newFriendship.toJSON());

        response.send(true);
    }

    * show(request, response)
    {
        const id = request.param('id');

        let user = yield User.query().where('id', id).fetch();

        // Workaround to sendThroughDataChannel array to view. TODO: fix this
        const json_user = JSON.stringify(user);
        user = JSON.parse(json_user);

        let friend = yield request.currentUser.friends().where('id', id).fetch();

        // Workaround to sendThroughDataChannel array to view. TODO: fix this
        const json_friend = JSON.stringify(friend);
        friend = JSON.parse(json_friend);

        let user_info = {
            id: user[0].id,
            fullname: user[0].first_name + user[0].last_name,
            isFriend: friend.length > 0
        };

        response.send(user_info);
    }

    * destroy(request, response)
    {
        const id = request.all().id;
    }

    * people(request, response)
    {
        let users = yield User.all();
        // Workaround to sendThroughDataChannel array to view. TODO: fix this
        const json_users = JSON.stringify(users);
        users = JSON.parse(json_users);

        yield response.sendView('pages/friends/people', {persons: users});
    }

}

module.exports = FriendController;
