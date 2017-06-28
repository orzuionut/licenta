import {Config} from "../_config";
import {SocketIO} from '../modules/socket';

class FileTransfer
{
    constructor(id, user_id, user_name)
    {
        this.id = id;
        this.user_id = user_id;
        this.user_name = user_name;

        this.socketIO = new SocketIO(io, 'http://localhost:8181/chat');
        this.socketIO.setRoom(this.id);

        this.files = {};

        this.bindListeners();
    }

    bindListeners()
    {
        PubSub.subscribe(Config.getFileDroppedMessage(), this.handleFileDropped.bind(this));

        PubSub.subscribe(Config.getConversationSwitchMessage(), this.handleConversationSwitched.bind(this));

        this.socketIO.socket.on('new_file', this.handleNewFile.bind(this));

        PubSub.subscribe(Config.getDownloadFileMessage(), this.handleFileDownload.bind(this));
    }

    handleFileDropped(message, files)
    {
        const self = this;

        files.forEach(function (file)
        {
            self.seedFile(file).then(function (torrent)
            {
                let data = {
                    sender_id: self.user_id,
                    user_name: self.user_name,
                    fileName: file.name,
                    torrentMagnetURI: torrent.magnetURI
                };

                self.showFileOnDOM(data);

                self.sendFileToOtherParticipants(data);
            });
        });
    }

    seedFile(file)
    {
        const webtorrentClient = new WebTorrent();

        return new Promise(function (resolve, reject)
        {
            webtorrentClient.seed(file, function (torrent)
            {
                resolve(torrent);
            });
        });
    }

    showFileOnDOM(data)
    {
        PubSub.publish(Config.getShowFileNameOnDOMMessage(), data);
    }

    sendFileToOtherParticipants(data)
    {
        this.socketIO.sendMessage("new_file", data);
    }

    handleNewFile(data)
    {
        this.storeFileInfo(data[0].fileName, data[0].torrentMagnetURI);

        let fileData = {
            sender_id: data[0].sender_id,
            user_name: data[0].user_name,
            fileName: data[0].fileName,
        };

        this.showFileOnDOM(fileData);
    }

    storeFileInfo(fileName, torrentMagnetURI)
    {
        this.files[fileName] = torrentMagnetURI;
    }

    handleFileDownload(message, fileName)
    {
        const torrentMagnetURI = this.files[fileName];
        const webtorrentClient = new WebTorrent();

        console.log(torrentMagnetURI);

        this.showFlashMessageFileDownloading();

        webtorrentClient.add(torrentMagnetURI, function (torrent)
        {
            torrent.on('done', function ()
            {
                torrent.files.forEach(function (file)
                {
                    file.getBlobURL(function (err, url)
                    {
                        if (err) throw err;

                        let $downloadLink = $("<a/>", {
                            class: 'message-file-downloaded',
                            download: file.name,
                            href: url,
                            text: file.name + " downloaded"
                        });

                        $('#conversation-messages-body').append($downloadLink);
                    });
                });
            });
        });
    }

    handleConversationSwitched(message, new_conversation_id)
    {
        this.socketIO.setRoom(new_conversation_id);
    }

    showFlashMessageFileDownloading()
    {
        Materialize.toast('File is downloading. Click on download when finished', 3000);
    }
}

export {FileTransfer}