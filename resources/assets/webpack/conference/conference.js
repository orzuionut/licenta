import { ConferenceDOM } from './dom';
import { Config } from './../_config';
import { Participant } from './participants';
import { SocketIO } from '../modules/socket';

class Conference {
    constructor()
    {
        this.id = getIDfromURL();

        this.socketIO = new SocketIO(io, 'http://localhost:8181');

        this.socketIO.setRoom(this.id);
    }

    init()
    {
        var data = {
            id: "joinRoom"
        };
        this.sendMessage(data);
    }

    listen()
    {
        this.sessionId = null;
        this.participants = {};

        this.iceServers = Config.getIceServers();

        window.onbeforeunload = function ()
        {
            this.socketIO.socket.disconnect();
        }.bind(this);


        this.socketIO.socket.on("id", function (id)
        {
            this.sessionId = id;
        }.bind(this));

        this.socketIO.socket.on("message", function (message)
        {

            switch (message.id) {
                case "existingParticipants":
                    this.onExistingParticipants(message);
                    break;
                case "newParticipantArrived":
                    this.onNewParticipant(message);
                    break;
                case "participantLeft":
                    this.onParticipantLeft(message);
                    break;
                case "receiveVideoAnswer":
                    this.onReceiveVideoAnswer(message);
                    break;
                case "iceCandidate":
                    var participant = this.participants[message.sessionId];

                    if (participant != null) {
                        participant.rtcPeer.addIceCandidate(message.candidate, function (error)
                        {
                            if (error) {
                                if (message.sessionId === this.sessionId) {
                                    console.error("Error adding candidate to self : " + error);
                                } else {
                                    console.error("Error adding candidate : " + error);
                                }
                            }
                        });
                    } else {
                        console.error('still does not establish rtc peer for : ' + message.sessionId);
                    }
                    break;

                default:
                    console.error("Unrecognized message: ", message);
            }
        }.bind(this));

    }

    onExistingParticipants(message)
    {
        var constraints = {
            audio: true,
            video: true
        };

        // create video for current user to send to server
        var localParticipant = new Participant(this.sessionId, this.socketIO.socket);

        this.participants[this.sessionId] = localParticipant;

        var video = ConferenceDOM.createVideo(localParticipant);

        // bind function so that calling 'this' in that function will receive the current instance
        var options = {
            localVideo: video,
            mediaConstraints: constraints,
            onicecandidate: localParticipant.onIceCandidate.bind(localParticipant),
            configuration: this.iceServers
        };

        localParticipant.rtcPeer = new kurentoUtils.WebRtcPeer.WebRtcPeerSendonly(options, function (error)
        {
            if (error)
            {
                return console.error(error);
            }

            // Generate the SDP offer
            this.generateOffer(localParticipant.offerToReceiveVideo.bind(localParticipant));
        });

        // @message.data => existing Participants in the room
        for (var i in message.data) {
            this.receiveVideoFrom(message.data[i]);
        }
    }

    receiveVideoFrom(sender)
    {
        var participant = new Participant(sender, this.socketIO.socket);
        this.participants[sender] = participant;

        var video = ConferenceDOM.createVideo(participant);

        var options = {
            remoteVideo: video,
            onicecandidate: participant.onIceCandidate.bind(participant),
            configuration: this.iceServers
        };

        participant.rtcPeer = new kurentoUtils.WebRtcPeer.WebRtcPeerRecvonly(options, function (error)
        {
            if (error) {
                return console.error(error);
            }
            
            this.generateOffer(participant.offerToReceiveVideo.bind(participant));
        });
    }

    /**
     * Receive video from new participant
     * @param message
     */
    onNewParticipant(message)
    {
        this.receiveVideoFrom(message.new_user_id)
    }

    /**
     * Destroy videostream/DOM element on participant leaving room
     * @param message
     */
    onParticipantLeft(message)
    {
        var participant = this.participants[message.sessionId];

        participant.dispose();
        delete this.participants[message.sessionId];

        // remove video tag
        $("#video-" + participant.id).remove();
    }

    onReceiveVideoAnswer(message)
    {
        var participant = this.participants[message.sessionId];

        // Process the SDP
        participant.rtcPeer.processAnswer(message.sdpAnswer, function (error)
        {
            if (error) {
                console.error(error);
            } else {
                participant.isAnswer = true;

                while (participant.iceCandidateQueue.length) {
                    console.error("Collected : " + participant.id + " ice candidate");

                    var candidate = participant.iceCandidateQueue.shift();
                    participant.rtcPeer.addIceCandidate(candidate);
                }
            }
        });
    }

    sendMessage(data)
    {
        this.socketIO.sendMessage('message', data);
    }

}

export { Conference }