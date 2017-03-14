import { Header } from './header';
import { Body } from './body';
import { Footer } from './footer';

class FilesDOM
{
    constructor()
    {
        this.header = new Header();
        this.body = new Body();
        this.footer = new Footer();

        this.$container = $('.conversation-files-wrapper');
    }

    show()
    {
        this.$container.css({ display: "flex" });
    }

    hide()
    {
        this.$container.css({ display: "none" });
    }
}

export { FilesDOM }