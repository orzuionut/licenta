if (typeof importScripts === 'function')
{
    importScripts('https://cdnjs.cloudflare.com/ajax/libs/socket.io/1.7.2/socket.io.js');

    let worker_object = self;

    class Worker 
    {
        constructor(event)
        {
            this.socket = io('http://localhost:8181/videocall');

            this.hash = event.data.hash;
            this.file = event.data.file;
            this.fileName = event.data.fileName;
            this.userId = event.data.user_id;

            this.chunkSize = 200000;

            this.reader = new FileSlicer();
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

            this.upload(data);

            if (this.file.size > this.offset + data.byteLength)
            {
                setTimeout(this.sliceFile.bind(this), 100, this.offset + this.chunkSize);
            }
            else
            {
                this.uploadFinished();
            }
        }

        upload(data)
        {
            console.log("SEND TO SERVER");
            
            let sendData = {
                hash: this.hash,
                data: data
            };
            
            this.sendMessageWithType('store file chunk', sendData);
        }
        
        uploadFinished()
        {
            let data = {
                hash: this.hash,
                fileName: this.fileName,
                user_id: this.userId
            };
            
            this.sendMessageWithType('store file', data);

            worker_object.postMessage('File uploaded to server successfully');
        }

        sendMessageWithType(type, message)
        {
            this.socket.emit(type, message);
        }
    }

    self.onmessage = function (event)
    {
        let worker = new Worker(event);

        worker.sliceFile(0);
    };
}

