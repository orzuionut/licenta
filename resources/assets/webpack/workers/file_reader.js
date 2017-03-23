import {SocketIO} from "../modules/socket";

if (typeof importScripts === 'function')
{
    importScripts('https://cdnjs.cloudflare.com/ajax/libs/socket.io/1.7.2/socket.io.js');

    let worker_object = self;

    worker_object.socketIO = new SocketIO(io, 'http://localhost:8181/chat');
    
    class FileSlicer
    {
        constructor(file, socketIO)
        {
            this.file = file;
            this.socketIO = socketIO;

            this.chunkSize = 32000;

            this.reader = new FileReader();
            this.reader.onload = this.onReadAsArrayBuffer.bind(this);
        }

        sliceFile(offset)
        {
            this.offset = offset;

            let slice = this.file.slice(offset, offset + this.chunkSize);
            this.reader.readAsArrayBuffer(slice);
        }

        onReadAsArrayBuffer(event)
        {
            let data = event.target.result;

            this.sendChunk(data);

            if (this.file.size > this.offset + data.byteLength)
            {
                setTimeout(this.sliceFile.bind(this), 0, this.offset + this.chunkSize);
            }
            else
            {
                this.sendFinishMessage();
            }
        }

        sendChunk(chunk)
        {
            let data = {
                fileChunk: chunk
            };

            this.transfer(data, [data]);
        }

        sendFinishMessage()
        {
            let data = {
              finish: true  
            };

            delete this.reader;
            
           this.transfer(data);
        }

        transfer(data)
        {
            this.socketIO.sendMessage('file_chunk', data);
        }
    }

    self.onmessage = function (event)
    {
        let room = event.data.conversation_id + "_fileTransfer";
        worker_object.socketIO.setRoom(room);
        
        let fileReader = new FileSlicer(event.data.file, worker_object.socketIO);

        fileReader.sliceFile(0);
    };
}

