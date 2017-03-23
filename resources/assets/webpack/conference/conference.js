import { ConferenceDOM } from './dom';
import { Config } from './../_config';
import { Participant } from './participants';
import { SocketIO } from '../modules/socket';
import {FileReceive} from "./file_receive";
import {DB} from "../modules/indexedDB";
import {SendFile} from "./file_send";
import {DataChannelSend} from "./data_channel_send";
import {DataChannelReceive} from "./data_channel_receive";
import {Helper} from "../helpers/helper";

class Conference
{
    constructor(conversation_id)
    {
        this.id = conversation_id;

        this.socketIO = new SocketIO(io, 'http://localhost:8181');

        this.socketIO.setRoom(this.id);

        this.configuration = null;

        this.sessionId = null;
        this.participants = {};

        this.fileReceive = {};

        this.iceServers = Config.getIceServers();

        window.onbeforeunload = function () { this.socketIO.socket.disconnect(); }.bind(this);

        this.DOM = new ConferenceDOM();

        this.db = new DB();
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
        this.socketIO.socket.on("id", function (id) { this.sessionId = id; }.bind(this));

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
        var self = this;

        var dataChannelConfig = {};

        // Send Channel opened.. maybe enable buttons
        dataChannelConfig.onopen = function () {};
        dataChannelConfig.onclose = null;

        var constraints = {
            audio: true,
            video: true
        };

        // create video for current user to sendThroughDataChannel to server
        var localParticipant = new Participant(this.sessionId, this.socketIO.socket);

        this.participants[this.sessionId] = localParticipant;

        var video = ConferenceDOM.createVideo(localParticipant);

        // bind function so that calling 'this' in that function will receive the current instance
        var options = {
            localVideo: video,
            mediaConstraints: constraints,
            onicecandidate: localParticipant.onIceCandidate.bind(localParticipant),
            configuration: this.iceServers,
            dataChannelConfig: dataChannelConfig,
            dataChannels: true
        };

        localParticipant.rtcPeer = new kurentoUtils.WebRtcPeer.WebRtcPeerSendonly(options, function (error)
        {
            if (error) return console.error(error);
            
            this.generateOffer(localParticipant.offerToReceiveVideo.bind(localParticipant));
        });
        
        this.localPeer = localParticipant.rtcPeer;

        // Send files through data channel
        this.dataChannelSend = new DataChannelSend(this.localPeer);

        this.sendFile = new SendFile(this.DOM, this.dataChannelSend);
        this.sendFile.bindDOMListeners();

        /////////////////////////////////

        window.RTC = this.localPeer;

        // @message.data => existing Participants in the room
        for (var i in message.data) {
            this.receiveVideoFrom(message.data[i]);
        }
    }

    receiveVideoFrom(sender)
    {
        var dataChannel = new DataChannelReceive(this.localPeer);
        
        var dataChannelConfig = {};

        dataChannelConfig.onopen = function () {};
        dataChannelConfig.onclose = null;
        
        dataChannelConfig.onmessage = dataChannel.handleMessage;

        var participant = new Participant(sender, this.socketIO.socket);
        this.participants[sender] = participant;

        var video = ConferenceDOM.createVideo(participant);

        var options = {
            remoteVideo: video,
            onicecandidate: participant.onIceCandidate.bind(participant),
            configuration: this.iceServers,
            dataChannelConfig: dataChannelConfig,
            dataChannels: true
        };

        participant.rtcPeer = new kurentoUtils.WebRtcPeer.WebRtcPeerRecvonly(options, function (error)
        {
            if (error) { return console.error(error); }

            this.generateOffer(participant.offerToReceiveVideo.bind(participant));
        });

        dataChannel.setRemotePeer(participant.rtcPeer);

        this.fileReceive[sender] = new FileReceive(this.socketIO.socket, this.DOM, this.db, dataChannel);
        this.fileReceive[sender].bindEvents();
        this.fileReceive[sender].bindDOMListeners();

        PubSub.subscribe('handle data channel message', this.fileReceive[sender].handleDataChannelMessage.bind(this.fileReceive[sender]));


        //TODO: delete
        window.peerRTC = participant.rtcPeer;
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

        // Delete the file transfer
        delete this.fileReceive[message.sessionId];

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