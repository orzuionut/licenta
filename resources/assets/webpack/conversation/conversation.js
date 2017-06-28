import { SocketIO } from '../modules/socket';

class Conversation
{
    constructor(DOM, id, user_id, user_name)
    {
        this.DOM = DOM;

        this.id = id;
        this.user_id = user_id;
        this.user_name = user_name;
    }

    init()
    {
        let self = this;

        self.ENTER_KEY = 13;

        let data = {};

        self.socketIO = new SocketIO(io, 'http://' + window.location.hostname + ':8181/chat');

        if (self.socketIO.socket === undefined)
        {
            //show modal alert ERROR and EXIT
        }

        self.socketIO.setRoom(self.id);

        self.socketIO.sendMessage('init', data);

        self.bindSocketListeners();
        self.bindDOMListeners();
    }

    bindSocketListeners()
    {
        let self = this;

        self.socketIO.socket.on('init', function (data)
        {
            self.DOM.body.appendMessagesArray(data, self.user_id);
        });

        // Received message from server. Only non-sender type of clients receive this.
        self.socketIO.socket.on('output', function (data)
        {
            self.DOM.body.appendMessagesArray(data, self.user_id);
        });

        self.socketIO.socket.on('voice', function ()
        {
            PubSub.publish('voice_in_progress', {conversation_id: self.id});
        });

        self.socketIO.socket.on('call', function ()
        {
            PubSub.publish('call_in_progress', {conversation_id: self.id});
        });

        self.socketIO.socket.on('cinema', function ()
        {
            PubSub.publish('cinema_in_progress', {conversation_id: self.id});
        });
    }

    bindDOMListeners()
    {
        let self = this;
        let data = {};

        self.DOM.footer.$submit_button.on('click', function ()
        {
            let message = self.DOM.footer.getMessage();
            self.messageSubmitted(message);

            data = {
                user_id: self.user_id,
                message: message,
                user_name: self.user_name,
                conversation_id: self.id
            };
            self.socketIO.sendMessage('input', data);
        });

        self.DOM.footer.$message_input.keypress(function (e)
        {
            if (e.which == self.ENTER_KEY && self.DOM.footer.getMessage().trim())
            {
                self.DOM.footer.clickSubmitButton();
            }
        });
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

export {Conversation}
