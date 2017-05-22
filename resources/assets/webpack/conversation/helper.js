class Helper
{
    static appendConversationItems($container, items, current_user_id)
    {
        for(let i = 0; i < items.length; i++)
        {
            Helper.appendItem($container, items[i], current_user_id);
        }
    }

    static appendItem($container, item, current_user_id)
    {
        let is_current_user = item.user_id == current_user_id;
        let type = is_current_user ? 'message-user' : 'message-other';

        // This message is from another user
        if( ! is_current_user )
        {
            let sender_name = typeof item.user_name == 'undefined'
                ? item.user.first_name + " " + item.user.last_name
                : item.user_name;

            let $emitter = $("<div class='message-emitter'>" + sender_name + "</div>");

            Helper.append($container, $emitter);
        }

        // Either file name or message
        let text = typeof item.message != 'undefined' ? item.message : item.name;

        // This message is from current user
        Helper.append($container, $(`<div class='message-box ${type}' data-id="${item.id}">` + text + "</div>"));
    }

    static append($container, $element)
    {
        $container.append($element);

        Helper.scrollToBottom($container);
    }

    static scrollToBottom($container)
    {
        $container.scrollTop($container[0].scrollHeight);
    }
}

export {Helper}