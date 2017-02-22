import {Videocall} from './videocall';

$(document).ready(function ()
{
    let videocall = new Videocall();

    videocall.build();

    videocall.bindEvents();

    videocall.bindListeners();

});


