import {CinemaDOM} from "./dom/index";
import {Config} from "../_config";
import {SocketIO} from '../modules/socket';

class Cinema
{
    constructor(id)
    {
        this.id = id;
        this.dom = new CinemaDOM();

        this.socketIO = new SocketIO(io, 'https://' + window.location.hostname +'/chat');
        this.socketIO.setRoom(this.id);

        this.bindListeners();
    }

    bindListeners()
    {
        PubSub.subscribe(Config.getFilmDroppedMessage(), this.handleFilmDroppedOnDOM.bind(this));

        this.socketIO.socket.on('play_film', this.handleFilmReceived.bind(this));

        this.socketIO.socket.on('play_button_pressed', this.handlePlayButtonPressedByOther.bind(this));
        this.socketIO.socket.on('pause_button_pressed', this.handlePauseButtonPressedByOther.bind(this));


        PubSub.subscribe(Config.getFilmPlayButtonPressedMessage(), this.notifyParticipantsToPlayFilm.bind(this));
        PubSub.subscribe(Config.getFilmPauseButtonPressedMessage(), this.notifyParticipantsToPauseFilm.bind(this));
    }

    handleFilmDroppedOnDOM(message, file)
    {
        const self = this;

        self.seedFile(file).then(function (torrent)
        {
            self.hideFilmUpload();
            self.displayFilm(torrent.magnetURI);

            self.sendFilmToOtherParticipants(torrent);
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

    hideFilmUpload()
    {
        PubSub.publish(Config.getHideFilmUploadMessage(), null);
    }

    displayFilm(torrentMagnetURI)
    {
        const self = this;
        const webtorrentClient = new WebTorrent();

        webtorrentClient.add(torrentMagnetURI, function (torrent)
        {
            const file = torrent.files.find( function (file) {
                return file.name.endsWith('.mp4')
            });

            self.appendVideoToDOM(file);
        });
    }

    appendVideoToDOM(file)
    {
        PubSub.publish(Config.getAppendFilmToDOMMessage(), file);
    }

    sendFilmToOtherParticipants(torrent)
    {
        // send message with the torrent
        this.socketIO.sendMessage("play_film", { torrent: torrent.magnetURI });
    }

    handleFilmReceived(data)
    {
        this.hideFilmUpload();
        this.displayFilm(data[0].torrent);
    }

    notifyParticipantsToPlayFilm()
    {
        this.socketIO.sendMessage("play_button_pressed", {});
    }

    notifyParticipantsToPauseFilm()
    {
        this.socketIO.sendMessage("pause_button_pressed", {});
    }

    handlePlayButtonPressedByOther()
    {
        PubSub.publish(Config.getFilmPlayButtonPressedByOtherMessage(), null);
    }

    handlePauseButtonPressedByOther()
    {
        PubSub.publish(Config.getFilmPauseButtonPressedByOtherMessage(), null);
    }
}

export { Cinema }
