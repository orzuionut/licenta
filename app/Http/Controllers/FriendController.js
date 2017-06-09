'use strict'

const Event = use('Event');
const User = use('App/Model/User');
const Friend = use('App/Model/Friend');
const Database = use('Database');

class FriendController
{
    * index(request, response)
    {
        const currentUser = request.currentUser;
        let friends = yield currentUser.friends();

        yield response.sendView('pages/friends/index', {persons: friends});
    }

    * store(request, response)
    {
        let user_1_id = request.all().id;
        let user_2_id = request.currentUser.id;

        // Saving to the database in ascending order of id
        if (user_1_id < user_2_id)
        {
            let aux = user_1_id;
            user_1_id = user_2_id;
            user_2_id = aux;
        }

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
        user = user.toJSON();

        let isFriend = yield request.currentUser.isFriend(id);

        let user_info = {
            id: user[0].id,
            fullname: user[0].first_name + " " + user[0].last_name,
            isFriend: isFriend
        };

        response.send(user_info);
    }

    * destroy(request, response)
    {
        const friend_id = request.param('id');
        const user_id = request.currentUser.id;

        let deleteSuccess = 0;

        if (user_id > friend_id)
        {
            deleteSuccess = yield Database
                .table('friends')
                .where('user_id_1', user_id)
                .where('user_id_2', friend_id)
                .delete();
        }
        else
        {
            deleteSuccess = yield Database
                .table('friends')
                .where('user_id_1', friend_id)
                .where('user_id_2', user_id)
                .delete();
        }

        Event.fire('friendship.delete', {
            user_id_1: friend_id,
            user_id_2: user_id
        });

        response.send(deleteSuccess > 0);
    }

    * people(request, response)
    {
        let users = yield User
            .query()
            .where('id', "!=", request.currentUser.id)
            .fetch();

        yield response.sendView('pages/friends/people', {persons: users.toJSON()});
    }

}

module.exports = FriendController;
