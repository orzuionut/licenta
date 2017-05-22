import {ConversationFilesDOM} from './dom.js';
import {Config} from "../../_config";
import {ConversationCompleteFiles} from "./complete_files";
import {ConversationIncompleteFiles} from "./incomplete_files";

class ConversationFiles
{
    constructor(socketIO, conversation_id, current_user_id)
    {
        this.socketIO = socketIO;
        this.conversation_id = conversation_id;
        this.current_user_id = current_user_id;

        this.DOM = new ConversationFilesDOM();

        this.completeFiles = new ConversationCompleteFiles(this.current_user_id);
        this.incompleteFiles = new ConversationIncompleteFiles(this.current_user_id);

        this.webTorrentClient = new window.WebTorrent();

        this.bindListeners();
        this.bindSocketIOListeners();
    }

    bindListeners()
    {
        PubSub.subscribe(Config.getConversationSwitchMessage(), this.handleConversationSwitch.bind(this));

        // PubSub.subscribe(Config.getConversationFilesButtonClickedMessage(), this.show.bind(this));
        PubSub.subscribe(Config.getConversationFilesButtonClickedMessage(), this.DOM.show.bind(this.DOM));

        // File message-box clicked
        PubSub.subscribe(Config.getFileMessageBoxClickedMessage(), this.handleCompleteFileMessageBoxClicked.bind(this));
    }

    bindSocketIOListeners()
    {
        let self = this;

        self.socketIO.socket.on('conversation_complete_files_retrived', function (data)
        {
            // PubSub.publish(Config.getConversationCompleteFilesRetrievedMessage(), data);
            self.completeFiles.handleFilesRetrieved(data);
        });

        self.socketIO.socket.on('conversation_partial_files_retrived', function (data)
        {
            // PubSub.publish(Config.getConversationIncompleteFilesRetrievedMessage(), data);
            self.incompleteFiles.handleFilesRetrieved(data);
        });

        self.socketIO.socket.on('download_file', function (data)
        {
           self.handleFileDownload(data);
        });
    }

    handleConversationSwitch(message, conversation_id)
    {
        this.setConversationId(conversation_id);
        this.setSocketIORoom(conversation_id);

        this.socketIO.sendMessage('get_conversation_complete_files', {});
        this.socketIO.sendMessage('get_conversation_partial_files', {});
    }

    setConversationId(conversation_id)
    {
        this.conversation_id = conversation_id;
    }

    setSocketIORoom(conversation_id)
    {
        this.socketIO.setRoom(conversation_id);
    }

    handleCompleteFileMessageBoxClicked(message, data)
    {
        this.socketIO.sendMessage("download_file", data);
    }

    handleFileDownload(data)
    {
        let self = this;
        var progress = 0;

        this.webTorrentClient.add(data.torrentId, function (torrent)
        {
            console.log("ADDING FILE WEBTORRENT");

            let $downloadingStatus = $("<progress/>", {
                class: "message-downloading-progress",
                value: 0,
                max: 1
            });

            let $fileMessageBox = self.completeFiles.DOM.$container.find("[data-id='" + data.file_id + "']");

            $fileMessageBox.after($downloadingStatus);

            timeout($downloadingStatus);

            torrent.on('download', function ()
            {
               progress = torrent.progress;
            });

            torrent.on('done', function ()
            {
                let file = torrent.files.find(function (file) {
                    return file
                });

                file.getBlobURL(function (err, url)
                {
                    if (err) throw err

                    let $downloadLink = $("<a/>", {
                        download: file.name.replace("1234", ""),
                        href: url,
                        text: "Download"
                    });

                    $fileMessageBox.append($downloadLink);
                })
            });
        });

        function timeout($progresElement)
        {
            setTimeout(function ()
            {
                $progresElement.val(progress);

                timeout($progresElement);
            }, 3000);
        }
    }
}

export {ConversationFiles}