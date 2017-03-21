import {ConversationFull} from "./conversation_full";

$(document).ready(function ()
{
    let conversationFull = new ConversationFull();
    conversationFull.bindDOMListeners();
});