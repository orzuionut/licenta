import {Videocall} from './videocall';
import { ConversationBuilder } from '../conversation/conversation_builder';

$(document).ready(function ()
{
    let videocall = new Videocall();

    videocall.build();

    videocall.bindEvents();

    videocall.bindListeners();

    let build = new ConversationBuilder();
    
});


