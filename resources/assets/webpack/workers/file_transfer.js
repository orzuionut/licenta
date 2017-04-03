import {SocketIO} from "../modules/socket";
import {FileSlicer} from "./src/file_slicer";
import {FileReceiver} from "./src/file_receiver";

if (typeof importScripts === 'function')
{
    importScripts('https://cdnjs.cloudflare.com/ajax/libs/socket.io/1.7.2/socket.io.js');

    let worker_object = self;

    worker_object.socketIO = new SocketIO(io, 'http://localhost:8181/chat');

    self.onmessage = function (event)
    {
        if( event.data.isReader )
        {
            let hash = event.data.hash;
            
            let room = event.data.conversation_id + "_fileTransfer";
            worker_object.socketIO.setRoom(room);

            let fileReader = new FileSlicer(event.data.file, hash, worker_object.socketIO);

            fileReader.sliceFile(0);
        }
        else
        {
            let room = event.data.conversation_id + "_fileTransfer";
            worker_object.socketIO.setRoom(room);

            let fileReceiver = new FileReceiver(worker_object);
            fileReceiver.bindListener();
        }
    };
}

