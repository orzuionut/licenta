import { Conference } from './conference.js';

$(document).ready(function ()
{
    const conference = new Conference();

    conference.init();

    /////////////////////////////////////////////////////////////////////////////////////////////////////

    conference.listen();
});
