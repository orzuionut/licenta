import {ConversationFull} from "./conversation_full";

$(document).ready(function ()
{
    const user_id = $('#_user_id').val();
    const user_name = $('#_user_name').val();
    const conversation_id = $('#_conversation_id').val();
    
    let conversationFull = new ConversationFull(conversation_id, user_id, user_name);
});