class FileSlicer
{
    constructor(file, hash, socketIO)
    {
        this.file = file;
        this.hash = hash;
        this.socketIO = socketIO;

        // Set this to the client upload speed
        this.chunkSize = 1000000; // 1 MB

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

        console.log(data);

        this.sendChunk(data);

        if (this.file.size > this.offset + data.byteLength)
        {
            setTimeout(this.sliceFile.bind(this), 1000, this.offset + this.chunkSize);
        }
        else
        {
            this.sendFinishMessage();
        }
    }

    sendChunk(chunk)
    {
        let data = {
            fileChunk: chunk,
            hash: this.hash
        };

        this.transfer(data, [data]);
    }

    sendFinishMessage()
    {
        let data = {
            finish: true,
            fileName: this.file.name,
            hash: this.hash
        };

        delete this.reader;

        this.transfer(data);
    }

    transfer(data)
    {
        this.socketIO.sendMessage('file_chunk', data);
    }
}

export {FileSlicer}