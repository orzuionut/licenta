import {Videocall} from '../videocall/videocall';
import {ConversationBuilder} from '../conversation/conversation_builder';
import {Helper} from "../helpers/helper";

$(document).ready(function ()
{
    const user_id = $('#_user_id').val();
    const user_name = $('#_user_name').val();
    const conversation_id = Helper.getIDfromURL();

    let videocall = new Videocall(user_id);

    videocall.setConfig({
        audio: true,
        video: false
    });

    videocall.build();
    videocall.handleSocketMessages();
    videocall.bindListeners();

    let build = new ConversationBuilder(conversation_id, user_id, user_name);

});


