import {Helper} from "../helpers/helper";
import {Cinema} from "./cinema";
import {Conference} from "../conference/conference";
import {ConversationBuilder} from "../conversation/conversation_builder";

$(document).ready(function ()
{
    const user_id = $('#_user_id').val();
    const user_name = $('#_user_name').val();
    const conversation_id = Helper.getIDfromURL();

    const conference = new Conference(conversation_id);

    conference.init();
    conference.listen();

    let build = new ConversationBuilder(conversation_id, user_id, user_name);

    const cinema = new Cinema(conversation_id);
});
