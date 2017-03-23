import {Helper} from "../../helpers/helper";
import {DataReceive} from "./data_receive";

class FileResumeReceive extends DataReceive 
{
    constructor(user_id, socket, DOM, DB)
    {
        super(socket, DOM, DB);
        
        this.user_id = user_id;
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
    }

    getChunksByHash(hash)
    {
        return this.db.getByHash(hash);
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
        Helper.flash("Resuming download of the rest of the file from the server");

        this.arrayChunks = Helper.getArrayChunksFromObject(chunksStored);

        let data = {
            user_id: this.user_id,
            file_id: this.file_id
        };

        this.sendMessageWithType('download file', data);
    }

    handleFileDownload(data)
    {
        this.arrayChunks.push(data.chunk);
    }

    handleFileDownloadFinished(data)
    {
        Helper.flash("Temporary file data retrieve successfully");

        this.saveToDisk(this.arrayChunks, this.file_name);
    }
}

export {FileResumeReceive}
