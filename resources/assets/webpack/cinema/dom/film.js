import {Config} from "../../_config";

class FilmDOM
{
    constructor()
    {
        this.$container = $('#film-playing');
        this.$uploadContainer = $('#film-placeholder');

        this.flag = false;

        this.bindListeners();
    }

    bindListeners()
    {
        DragDrop(this.$uploadContainer.selector, this.handleFileDropped.bind(this));

        PubSub.subscribe(Config.getHideFilmUploadMessage(), this.hideFilmUploadContainer.bind(this));
        PubSub.subscribe(Config.getAppendFilmToDOMMessage(), this.handleAppendFilmToDOM.bind(this));

        // Other user pressed video player buttons
        PubSub.subscribe(Config.getFilmPlayButtonPressedByOtherMessage(), this.playVideo.bind(this));
        PubSub.subscribe(Config.getFilmPauseButtonPressedByOtherMessage(), this.pauseVideo.bind(this));
    }

    bindFilmListeners()
    {
        this.film = this.$container.find("video");

        this.film.on('play', function ()
        {
           PubSub.publish(Config.getFilmPlayButtonPressedMessage(), null);
        });

        this.film.on('pause', function()
        {
            PubSub.publish(Config.getFilmPauseButtonPressedMessage(), null);
        });
    }

    handleFileDropped(files)
    {
        PubSub.publish(Config.getFilmDroppedMessage(), files);
    }

    hideFilmUploadContainer()
    {
        this.$uploadContainer.hide();
    }

    handleAppendFilmToDOM(message, film)
    {
        film.appendTo(this.$container.selector, {autoplay: false});

        this.bindFilmListeners();
    }

    playVideo()
    {
        if ( this.film[0].paused )
        {
            this.film[0].play();
        }
    }

    pauseVideo()
    {
        if ( ! this.film[0].paused)
        {
            this.film[0].pause();
        }
    }
}

export { FilmDOM }