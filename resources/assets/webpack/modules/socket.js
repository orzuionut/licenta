class SocketIO
{
    constructor(io, url)
    {
        // Connection
        this.socket = io.connect(url, { secure: true, reconnect: true, rejectUnauthorized : false } );
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
