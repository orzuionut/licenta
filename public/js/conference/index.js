var socket = io.connect("http://localhost:8181");

var sessionId;
var participants = {};

// TODO: refactor iceServers to config file

var iceServers = {
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


$(document).ready(function () {
    var $registerButton = $("#register");


    $registerButton.click(function () {
        $registerButton.prop("disabled", true);
        $registerButton.hide();

        var room = prompt("Please enter room name");

        register(room);
    });
});


window.onbeforeunload = function(){
    socket.disconnect();
};


socket.on("id", function (id) {
    console.log("receive id : " + id);
    sessionId = id;
});

// message handler
socket.on("message", function (message) {
    switch (message.id) {
        case "existingParticipants":
            console.log("existingParticipans : " + message.data);

            onExistingParticipants(message);
            break;
        case "newParticipantArrived":
            console.log("newParticipantArrived : " + message.new_user_id);

            onNewParticipant(message);
            break;
        case "participantLeft":
            console.log("participantLeft : " + message.sessionId);

            onParticipantLeft(message);
            break;
        case "receiveVideoAnswer":
            console.log("receiveVideoAnswer from : " + message.sessionId);

            onReceiveVideoAnswer(message);
            break;
        case "iceCandidate":
            console.log("iceCandidate from : " + message.sessionId);

            var participant = participants[message.sessionId];
            if (participant != null) {
                console.log(message.candidate);
                //if (participant.isAnswer) {
                participant.rtcPeer.addIceCandidate(message.candidate, function (error) {
                    if (error) {
                        if (message.sessionId === sessionId) {
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
});

function sendMessage(data) {
    socket.emit("message", data);
}

function register(room) {
    var data = {
        id: "joinRoom",
        roomName: room
    };
    sendMessage(data);
}

function onExistingParticipants(message) {
    // var isFirefox = typeof InstallTrigger !== 'undefined';
    // if (!isFirefox) {
    var constraints = {
        audio: true,
        video: true
    };
    
    console.log(sessionId + " register in room " + message.roomName);

    // create video for current user to send to server
    var localParticipant = new Participant(sessionId);
    participants[sessionId] = localParticipant;
    var video = createVideoForParticipant(localParticipant);

    // bind function so that calling 'this' in that function will receive the current instance
    var options = {
        localVideo: video,
        mediaConstraints: constraints,
        onicecandidate: localParticipant.onIceCandidate.bind(localParticipant),
        configuration: iceServers
    };

    localParticipant.rtcPeer = new kurentoUtils.WebRtcPeer.WebRtcPeerSendonly(options, function (error) {
        if (error) {
            return console.error(error);
        }

        console.log("local participant id : " + sessionId);


        // Generate the SDP offer
        this.generateOffer(localParticipant.offerToReceiveVideo.bind(localParticipant));
    });
    // }

    // get access to video from all the participants
    console.log(message.data);

    // @message.data => existing Participants in the room
    for (var i in message.data) {
        receiveVideoFrom(message.data[i]);
    }
}

function receiveVideoFrom(sender) {
    console.log(sessionId + " receive video from " + sender);

    var participant = new Participant(sender);
    participants[sender] = participant;

    var video = createVideoForParticipant(participant);

    // bind function so that calling 'this' in that function will receive the current instance
    var options = {
        remoteVideo: video,
        onicecandidate: participant.onIceCandidate.bind(participant),
        configuration: iceServers
    };

    participant.rtcPeer = new kurentoUtils.WebRtcPeer.WebRtcPeerRecvonly(options, function (error) {
        if (error) {
            return console.error(error);
        }

        // Bind "this" keyword to \participant\
        this.generateOffer(participant.offerToReceiveVideo.bind(participant));
    });
}

/**
 * Receive video from new participant
 * @param message
 */
function onNewParticipant(message) {
    receiveVideoFrom(message.new_user_id)
}

/**
 * Destroy videostream/DOM element on participant leaving room
 * @param message
 */
function onParticipantLeft(message) {
    var participant = participants[message.sessionId];

    participant.dispose();
    delete participants[message.sessionId];

    // remove video tag
    $("#video-" + participant.id).remove();
}

function onReceiveVideoAnswer(message) {
    var participant = participants[message.sessionId];

    // Process the SDP
    participant.rtcPeer.processAnswer(message.sdpAnswer, function (error) {
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

/**
 * Create video DOM element
 * @param participant
 * @returns {Element}
 */
function createVideoForParticipant(participant) {

    var videoId = "video-" + participant.id;
    var videoHtml = '<video id="' + videoId + '" autoplay height="240px" poster="img/webrtc.png"></video>';
    videoHtml.muted = false;

    $("#videoList").append(videoHtml);

    var videoElement = $("#" + videoId)[0];

     /*
     * Mobile device so we will mirror video because it is using front-facing camera
     */
    if(isMobileBrowser){
        console.log(navigator.userAgent);
        videoElement.style.transform="rotateY(180deg)";    
    }

    // return video element
    return videoElement;
}

function isMobileBrowser(){
    var isMobile = {
        Android: function() {
            return navigator.userAgent.match(/Android/i);
        },
        BlackBerry: function() {
            return navigator.userAgent.match(/BlackBerry/i);
        },
        iOS: function() {
            return navigator.userAgent.match(/iPhone|iPad|iPod/i);
        },
        Windows: function() {
            return navigator.userAgent.match(/IEMobile/i);
        },
        any: function() {
            return (isMobile.Android() || isMobile.BlackBerry() || isMobile.iOS() || isMobile.Windows());
        }
    };

    if(isMobile.any()){
        return true;
    }
    
    return false;
}
