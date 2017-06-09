import {Modal} from "./modal";

class Friends
{
    constructor()
    {
        // Variables
        this.$filter = $('#persons-filter');
        this.modal = new Modal();
        
        this.bindListeners();
    }

    bindListeners()
    {
        let self = this;

        this.handleFiltering();
        this.handleModalTriggering();

        this.modal.$profileAddFriend.on('click', self.handleAddFriend.bind(self));
        this.modal.$profileRemoveFriend.on('click', self.handleRemoveFriend.bind(self));
    }
    
    handleFiltering()
    {
        this.$filter.on('keyup', function ()
        {
            var value = $(this).val();

            $('.person-box').each(function () {
                if ($(this).text().search(value) > -1) {
                    $(this).show();
                }
                else {
                    $(this).hide();
                }
            });
        });
    }

    handleModalTriggering()
    {
        let self = this;

        self.modal.$modalTrigger.on('click', function ()
        {
            var friend_id = this.id;

            // Get profile picture, name, other info from server
            $.ajax({
                type: 'GET',
                url: '/friends/' + friend_id,
                data: {},
                success: function (data)
                {
                    self.modal.profileID = data.id;
                    self.modal.$profileName.text(data.fullname);

                    if ( data.isFriend )
                    {
                        self.modal.showRemoveFriend();
                    }
                    else
                    {
                        self.modal.showAddFriend();
                    }
                }
            });

        });
    }

    handleAddFriend()
    {
        let self = this;
        
        let data = { 
            id: self.modal.profileID
        };

        $.ajax({
            type: "POST",
            url: "/friends",
            data: data,
            success: function (success) {
                if (success)
                {
                    self.modal.showRemoveFriend();
                }
            }
        });
    }

    handleRemoveFriend()
    {
        let self = this;
        
        $.ajax({
            type: "DELETE",
            url: "/friends/" + self.modal.profileID,
            data: {},
            success: function (success) {
                if (success)
                {
                    self.modal.showAddFriend();
                }
            }
        });
    }
}

export {Friends}