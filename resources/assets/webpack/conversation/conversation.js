class Conversation {

    constructor(DOM, id, user_id)
    {
        this.DOM = DOM;

        this.id = id;
        this.user_id = user_id;
    }

    setID(id)
    {
        this.id = id;
    }

    messageSubmitted(message)
    {
        let data = {
            user_id: this.user_id,
            message: message
        };

        this.DOM.body.appendMessage(data, this.user_id);

        this.DOM.footer.clearInput();
    }
}

export { Conversation }