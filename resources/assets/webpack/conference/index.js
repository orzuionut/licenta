import { Conference } from './conference.js';
import {ConversationBuilder} from "../conversation/conversation_builder";

$(document).ready(function ()
{
    const conference = new Conference();

    conference.init();

    /////////////////////////////////////////////////////////////////////////////////////////////////////

    conference.listen();

    let build = new ConversationBuilder();
});
