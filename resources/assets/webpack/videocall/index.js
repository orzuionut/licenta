import {Videocall} from './videocall';
import { ConversationBuilder } from '../conversation/conversation_builder';
import {Helper} from "../helpers/helper";

$(document).ready(function ()
{
    const id = Helper.getIDfromURL();

    let videocall = new Videocall();

    videocall.build();

    videocall.bindEvents();

    videocall.bindListeners();

    let build = new ConversationBuilder(id);
    
});


