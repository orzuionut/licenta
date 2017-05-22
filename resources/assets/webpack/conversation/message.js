class Message
{
    constructor(data, type)
    {
        return this.create(data.message, type);
    }

    create(message, type)
    {
        return $(`<div class='message-box ${type}'>` + message + "</div>");
    }

    static createEmitter(emitter)
    {
        return $("<div class='message-emitter'>" + emitter + "</div>");
    }

}

export{ Message }