import { SocketIO } from '../modules/socket';

class Conversation {

    constructor(DOM, id, user_id)
    {
        this.DOM = DOM;

        this.id = id;
        this.user_id = user_id;
    }

    init()
    {
        let self = this;

        self.ENTER_KEY = 13;

        let data = {};

        self.socketIO = new SocketIO(io, 'http://localhost:8181/chat');

        if (self.socketIO.socket === undefined)
        {
            //show modal alert ERROR and EXIT
        }

        self.socketIO.setRoom(self.id);

        self.socketIO.sendMessage('init', data);

        self.bindSocketListeners();
        self.bindDOMListeners();


        // // Match all anchor tags with id like :conversation-id-{number}:
        // conversations_list.item.click(function () {
        //     let old_conversation_id = conversation.id;
        //     let new_conversation_id = conversations_list.getItemID(this);
        //
        //     // Conversation changed. Update stuff
        //     if (old_conversation_id !== new_conversation_id)
        //     {
        //         conversation.DOM.body.clear();
        //
        //         conversation.setID(new_conversation_id);
        //
        //         socketIO.setRoom(new_conversation_id);
        //
        //         data.leaveRoom = old_conversation_id;
        //         socketIO.sendMessage('roomChanged', data);
        //
        //         socketIO.sendMessage('init', data);
        //     }
        // });

        // conversation.DOM.header.$video_button.click(function () {
        //     data = {};
        //     socketIO.sendMessage('call', data);
        //
        //     window.location.href = "/conversation/call/" + conversation.id;
        // });
        //
        // conversation.DOM.header.$answer_call.click(function () {
        //     window.location.href = "/conversation/call/" + conversation.id;
        // });
        //
        // conversation.DOM.header.$reject_call.click(function () {
        //     conversation.DOM.header.hideIncomingCallAlert();
        // });
    }

    bindSocketListeners()
    {
        let self = this;

        self.socketIO.socket.on('init', function (data) {
            self.DOM.body.appendMessagesArray(data, self.user_id);
        });

        // Received message from server. Only non-sender type of clients receive this.
        self.socketIO.socket.on('output', function (data) {
            self.DOM.body.appendMessagesArray(data, self.user_id);
        });

        self.socketIO.socket.on('call', function (data) {
            self.DOM.header.showIncomingCallAlert();
        });
    }

    bindDOMListeners()
    {
        let self = this;
        let data = {};

        self.DOM.footer.$submit_button.on('click', function () {

            let message = self.DOM.footer.getMessage();
            self.messageSubmitted(message);

            data = {
                user_id: self.user_id,
                message: message,
                user_name: user_name,
                conversation_id: self.id
            };
            self.socketIO.sendMessage('input', data);
        });

        self.DOM.footer.$message_input.keypress(function (e) {
            if (e.which == self.ENTER_KEY)
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