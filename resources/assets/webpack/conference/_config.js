class Config 
{
    static getIceServers()
    {
        return {
            iceServers: [
                {
                    urls: "stun:stun.l.google.com:19302"
                },
                {
                    urls: "stun:stun1.l.google.com:19302"
                },
                {
                    urls: "stun:stun.voxgratia.org"
                },
                {
                    urls: "turn:numb.viagenie.ca",
                    username: "darkstyle6196@gmail.com",
                    credential: "nonney06011996"
                }
            ]
        };
    }
}

export { Config }