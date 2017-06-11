import {FileTransfer} from "./file_transfer";
import {Helper} from "../helpers/helper";

$(document).ready(function ()
{
    const user_id = $('#_user_id').val();
    const user_name = $('#_user_name').val();
    const conversation_id = $('#_conversation_id').val();


    const fileTransfer = new FileTransfer(conversation_id, user_id, user_name);
});
