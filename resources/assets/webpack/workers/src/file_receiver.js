class FileReceiver
{
    constructor(worker_object)
    {
        this.worker_object = worker_object;
        this.socketIO = worker_object.socketIO;

        this.fileChunkArray = {};
    }

    bindListener()
    {
        let self = this;

        this.socketIO.socket.on('file_chunk', function (data)
        {
            self.handleFileChunk(data);
        });
    }

    handleFileChunk (_data)
    {
        if ( _data[0].finish )
        {
            let hash = _data[0].hash;
            
            let data = {
                blob: new Blob(this.fileChunkArray[hash]),
                fileName: _data[0].fileName
            };

            this.worker_object.postMessage(data);
        }
        else
        {
            let hash = _data[0].hash;

            if ( typeof this.fileChunkArray[hash] == 'undefined' )
            {
                this.fileChunkArray[hash] = [];
            }

            this.fileChunkArray[hash].push(_data[0].fileChunk);
        }
    }
}

export {FileReceiver}