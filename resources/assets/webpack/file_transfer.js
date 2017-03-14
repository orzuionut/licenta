import {Helper} from "./helpers/helper";
import {DB} from "./modules/indexedDB";

class FileTransfer
{
    constructor(socket, DOM, peerConnection)
    {
        this.socket = socket;
        this.DOM = DOM;
        this.peerConnection = peerConnection;

        ////////////////////////
        this.db = new DB();

        this.channelOpen = true;

        this.arrayToStoreChunks = [];
        this.receivedDataSize = 0;
        this.temporaryDataSize = 0;
        this.lastPositionSavedInArray = 0;
        this.chunkSizeLimit = 992000; // save chunks of ~ 1 MB to DB (62 slices of 16KB received)
        this.uuid = Helper.guid();

    }

    bindEvents()
    {
        this.socket.on('download file', this.handleFileDownload.bind(this));
        this.socket.on('download finished', this.handleFileDownloadFinished.bind(this));
    }

    bindDOMListeners()
    {
        let self = this;

        this.DOM.conversationDOM.filesDOM.body.$files.on('click', this.target, self.handleFileDownloadResume.bind(self));
        this.DOM.conversationDOM.filesDOM.footer.$inputFile.on('change', this, self.DOM.handleFileInputChanged.bind(self.DOM));
        this.DOM.conversationDOM.filesDOM.footer.$sendButton.on('click', self.sendFileToPeer.bind(self));
    }

    handleDataChannelMessage(message, event)
    {
        let data = event.data;

        if (typeof data !== 'string')
        {
            this.arrayToStoreChunks.push(data);

            this.temporaryDataSize += data.byteLength;

            if (this.temporaryDataSize == this.chunkSizeLimit)
            {
                let temporaryDataArray = this.arrayToStoreChunks.slice(this.lastPositionSavedInArray);

                this.storeTemporaryData({data: temporaryDataArray, hash: this.uuid});

                this.receivedDataSize += this.temporaryDataSize;
                this.temporaryDataSize = 0;
                this.lastPositionSavedInArray = this.arrayToStoreChunks.length;
            }
        }
        else
        {
            data = JSON.parse(data);

            this.saveToDisk(this.arrayToStoreChunks, data.fileName);

            this.deleteTemporaryData(this.uuid);

            this.arrayToStoreChunks = [];
            this.receivedDataSize = 0;

            Helper.flash("You have received a new file");
        }
    }

    sendFileToPeer()
    {
        Helper.flash("Sending file to your friend..");
        
        this.file = this.getFileFromInput();

        this.chunkSize = 16000;

        this.reader = new window.FileReader();
        this.reader.onload = this.onReadAsArrayBuffer.bind(this);

        this.sliceFile(0);
    }

    sliceFile(offset)
    {
        this.offset = offset;

        if (this.channelOpen)
        {
            let slice = this.file.slice(offset, offset + this.chunkSize);
            this.reader.readAsArrayBuffer(slice);
        }
        else
        {
            console.log("Exception.. channel closed..");
        }
    }

    onReadAsArrayBuffer(event)
    {
        let data = event.target.result;

        this.sendThroughDataChannel(data);

        if (this.file.size > this.offset + data.byteLength)
        {
            window.setTimeout(this.sliceFile.bind(this), 100, this.offset + this.chunkSize);
        }
        else
        {
            let data = {fileName: this.file.name};
            this.sendThroughDataChannel(JSON.stringify(data));

            delete this.reader;
        }
    }

    saveToDisk(array, fileName)
    {
        let received = new window.Blob(array);

        let $fileLink = $('<a/>', {
            text: fileName,
            href: URL.createObjectURL(received),
            target: '_blank',
            download: fileName,
            class: 'single-file file-bubble file-bubble-download',
            id: 'auto-download'
        });

        var $el = $('#files-container');

        $el.append($fileLink);
    }

    storeTemporaryData(data)
    {
        return this.db.insert(data);
    }

    deleteTemporaryData(hash)
    {
        this.db.deleteByHash(hash);
    }

    getChunksByHash(hash)
    {
        return this.db.getByHash(hash);
    }

    sendThroughDataChannel(data)
    {
        if (this.channelOpen)
        {
            try
            {
                if (this.peerConnection.isInitiator)
                {
                    this.peerConnection.sendChannel.send(data);
                }
                else
                {
                    this.peerConnection.receiveChannel.send(data);
                }
            }
            catch (exception)
            {
                this.channelOpen = false;
            }
        }
    }

    getFileFromInput()
    {
        return this.DOM.conversationDOM.filesDOM.footer.$inputFile[0].files[0];
    }

    hangup()
    {
        let data = {};

        if (this.receivedDataSize != 0)
        {
            data.receivedDataSize = this.receivedDataSize;
            data.hash = this.uuid;
        }

        data.message = 'bye';
        data.channel = this.room;

        this.sendMessage(data);

    }

    handleRemoteHangup(message)
    {
        if (message.receivedDataSize)
        {
            Helper.flash("Please wait while the rest of the file is uploaded to the server..");

            console.log("I have sent " + message.receivedDataSize + " to other peer");
            console.log("Also the saved chunks of files are saved with hash: " + message.hash);

            let remainingSlicesFromFile = this.file.slice(message.receivedDataSize);

            let fileToStore = this.blobToFile(remainingSlicesFromFile, this.file.name);

            this.storeFile(fileToStore, message.hash);
        }

        this.DOM.updateVideoElementsCallStopped();
        this.DOM.showFlashMessageCallStopped();
    }

    storeFile(file, hash)
    {
        let data = {
            user_id: user_id,
            file: file,
            fileName: this.file.name,
            hash: hash
        };

        this.sendMessageWithType('store file', data);
    }

    blobToFile(blob, fileName)
    {
        blob.lastModifiedDate = new Date();
        blob.name = fileName;
        return blob;
    }

    sendMessage(message)
    {
        this.socket.emit('message', message);
    }

    // TODO: refactor
    sendMessageWithType(type, message)
    {
        this.socket.emit(type, message);
    }

    handleFileDownloadResume(file)
    {
        Helper.flash("Attempting to retrieve temporary data");

        // this is bind to DOM element
        this.file_id = $(file.target).attr('data-id');
        this.file_name = $.trim($(file.target).text());

        this.getChunksByHash(this.file_id)
            .then(this.handleChunksFetchSuccess.bind(this))
            .catch(this.handleChunksFetchError);
    }

    handleChunksFetchSuccess(chunksStored)
    {
        Helper.flash("Temporary file data retrieve successfully");
        Helper.flash("Resuming download of the rest of the file from the server");

        this.arrayChunks = this.getArrayChunksFromObject(chunksStored);

        /////////////////////////////////////////////////////////////////
        let data = {
            user_id: user_id,
            file_id: this.file_id
        };

        this.sendMessageWithType('download file', data);
    }

    handleFileDownload(data)
    {
        console.log("GOT DATA");
        this.arrayChunks.push(data.chunk);
    }

    handleFileDownloadFinished(data)
    {
        Helper.flash("Temporary file data retrieve successfully");

        this.saveToDisk(this.arrayChunks, this.file_name);
    }

    // chunksObjects contains multiple objects that each contain data equal to an Array[62]
    getArrayChunksFromObject(chunksObjects)
    {
        var chunksArray = [];

        for (let i = 0; i < chunksObjects.length; i++)
        {
            chunksArray.push(...chunksObjects[i].data);
        }

        return chunksArray;
    }

}

export {FileTransfer}
