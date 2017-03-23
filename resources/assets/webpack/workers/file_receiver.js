import {SocketIO} from "../modules/socket";

if (typeof importScripts === 'function')
{
    importScripts('https://cdnjs.cloudflare.com/ajax/libs/socket.io/1.7.2/socket.io.js');

    let worker_object = self;

    worker_object.socketIO = new SocketIO(io, 'http://localhost:8181/chat');

    class FileReceiver
    {
        constructor(socketIO)
        {
            this.socketIO = socketIO;
        }

        bindListener()
        {
            let self = this;

            this.socketIO.socket.on('file_chunk', function (data)
            {
                console.log("GOT CHUNK");
            });
        }

        handleFileChunk(data)
        {
            // if ( typeof data[0].fileName == 'undefined' )
            // {
            //     let arrayBuffer = data[0];
            //
            //     this.fileChunksArray.push(arrayBuffer);
            // }
            // else
            // {
            //
            // }

            console.log(data);
        }
    }

    self.onmessage = function (event)
    {
        // Room name is like: {conversation_id}_fileTransfer
        let room = event.data + "_fileTransfer";
        worker_object.socketIO.setRoom(room);

        let fileReceiver = new FileReceiver(worker_object.socketIO);
        fileReceiver.bindListener();
    };
}

