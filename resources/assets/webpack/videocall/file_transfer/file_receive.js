import {Helper} from "../../helpers/helper";
import {DataReceive} from "./data_receive";

class FileReceive extends DataReceive
{
    constructor(socket, DOM, DB, peerConnection)
    {
        super(socket, DOM, DB);

        this.peerConnection = peerConnection;

        this.room = Helper.getIDfromURL();
        
        this.channelOpen = true;

        this.arrayToStoreChunks = [];
        this.receivedDataSize = 0;
        this.temporaryDataSize = 0;
        this.lastPositionSavedInArray = 0;
        this.chunkSizeLimit = 992000; // save chunks of ~ 1 MB to DB (62 slices of 16KB received)
        this.uuid = Helper.guid();
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

    storeTemporaryData(data)
    {
        return this.db.insert(data);
    }

    deleteTemporaryData(hash)
    {
        this.db.deleteByHash(hash);
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
    
}

export {FileReceive}
