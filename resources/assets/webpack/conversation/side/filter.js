class ConversationsFilter
{
    constructor()
    {
        this.$filterInput = $("#filter-conversations-input");

        this.bindDOMListeners();
    }
    
    bindDOMListeners()
    {
        this.handleFiltering();
    }

    handleFiltering()
    {
        this.$filterInput.on('keyup', function ()
        {
            var value = $(this).val();

            $('.conversation-item').each(function () {
                if ($(this).text().search(value) > -1) {
                    $(this).show();
                }
                else {
                    $(this).hide();
                }
            });
        });
    }
}

export {ConversationsFilter}