class DataReceive
{
    constructor(socket, DOM, DB)
    {
        this.socket = socket;
        this.DOM = DOM;

        this.db = DB;
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

    sendMessageWithType(type, message)
    {
        this.socket.emit(type, message);
    }
}

export{DataReceive}