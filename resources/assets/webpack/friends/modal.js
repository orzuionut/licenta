class Modal
{
    constructor()
    {
        this.$modal = $('.modal');
        
        this.$modalTrigger = $('.modal-trigger');
        
        this.profileID = null;

        this.$profileName = $('#profile-name');
        this.$profileAddFriend = $('#areNotFriends');
        this.$profileRemoveFriend = $('#areFriends');

        this.activateModal();
    }
    
    activateModal()
    {
        this.$modal.modal();
    }
    
    showAddFriend()
    {
        this.$profileRemoveFriend.hide();
        this.$profileAddFriend.show();
    }
    
    showRemoveFriend()
    {
        this.$profileAddFriend.hide();
        this.$profileRemoveFriend.show();
    }
}

export {Modal}