class SocketIO {

    constructor(io, url)
    {
        this.socket = io.connect(url);
    }

    sendMessage(event, data)
    {
        // Add the room to the message
        data.room = this.room;

        this.socket.emit(event, data);
    }

    setRoom(room)
    {
        this.room = room;
        
        this.socket.emit('join', {room: room});
    }

}

export { SocketIO }