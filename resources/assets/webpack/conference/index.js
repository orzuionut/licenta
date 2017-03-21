import { Conference } from './conference.js';
import {ConversationBuilder} from "../conversation/conversation_builder";
import {Helper} from "../helpers/helper";

$(document).ready(function ()
{
    const id = Helper.getIDfromURL();
    
    const conference = new Conference();

    conference.init();
    conference.listen();
    
    let build = new ConversationBuilder(id);

    window.Conference = conference;
});
