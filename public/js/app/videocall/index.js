'use strict';

var webrtcDetectedBrowser = navigator.getUserMedia || navigator.mozGetUserMedia || navigator.webkitGetUserMedia;

window.onbeforeunload = function (e) {
    hangup();
};

var sendChannel, receiveChannel;
var sendButton = document.getElementById("sendButton");
var dataChannelSend = document.getElementById("dataChannelSend");
var dataChannelReceive = document.getElementById("dataChannelReceive");


var localVideo = document.querySelector('#localVideo');
var remoteVideo = document.querySelector("#remoteVideo");


sendButton.onclick = sendData;


var isChannelReady = false;
var isInitiator = false;
var isStarted = false;

//WebRTC data structures
//Streams
var localStream;
var remoteStream;
// PeerConnection
var pc;

// PeerConnection ICE protocol configuration (either Firefox or Chrome)
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

// DtlsSrtpKeyAgreement is required for Chrome and Firefox to interoperate.
// RtpDataChannels is required if we want to make use of the DataChannels API on Firefox.
var pc_constraints = {
    'optional': [
        {'DtlsSrtpKeyAgreement': true},
        {'RtpDataChannels': true}
]};

var sdpConstraints = webrtcDetectedBrowser === 'firefox' ?
    {'offerToReceiveAudio':true,'offerToReceiveVideo':true } :
    {'mandatory': {'OfferToReceiveAudio':true, 'OfferToReceiveVideo':true }};


var room = getIDfromURL();

//Connect to signaling server
/*
 * For non-localhost links usage:
 * 1. Create tunnel link (example: with ngrok) to port 8181
 *    (Example with ngrok: ngrok http --bind-tls=true 8181)
 * 2. Add to socket connect (example: var socket = io.connect("https://3307705a.ngrok.io");)
 * 3. Create tunnel link to port for the app (example: 3700)
 * 4. Access tunnel link for port for the app in browser
 * 5. Enjoy!
 */

var socket = io.connect('http://localhost:8181/videocall');

// Send 'Create or join' message to signaling server
if (room !== '') {
    console.log('Create or join room', room);
    socket.emit('create or join', room);
}

var constraints = {
    video: true,
    audio: true
};

navigator.getUserMedia(constraints, handleUserMedia, handleUserMediaError);



//From this point on, execution proceeds based on asynchronous events...

function handleUserMedia(stream) {
    localStream = stream;
    attachMediaStream(localVideo, stream);
    console.log('Adding local stream.');
    sendMessage({
        message: 'got user media',
        channel: room
    });
    
    if (isInitiator) {
        checkAndStart();
    }

    console.log(isInitiator);
}

function handleUserMediaError(error) {
    console.log('navigator.getUserMedia error: ', error);
}

// Server-mediated message exchanging...

// 1. Server-->Client...

socket.on('created', function (room) {
    isInitiator = true;
});

socket.on('full', function (room) {
    console.log('Room ' + room + ' is full');
});

socket.on('join', function (room) {
    console.log('Another peer made a request to join room: ' + room);
    console.log('This peer is the initiator of room ' + room + '!');
    isChannelReady = true;
});

socket.on('joined', function (room) {
    console.log('This peer has joined room ' + room);
    isChannelReady = true;
});

// Receive message from the other peer via the signaling server
socket.on('message', function (message) 
{
    if (message.message == 'got user media') 
    {
        checkAndStart();

    } else if (message.sd && message.sd.type === 'offer')
    {
        if (!isInitiator && !isStarted)
        {
            checkAndStart();
        }

        // Check message for this RTCSessionDescription setter
        pc.setRemoteDescription(new RTCSessionDescription(message.sd));
        doAnswer();

    } else if (message.sd.type === 'answer' && isStarted)
    {
        pc.setRemoteDescription(new RTCSessionDescription(message.sd));

    } else if (message.type === 'candidate' && isStarted)
    {
        var candidate = new RTCIceCandidate({
            sdpMLineIndex: message.label,
            candidate: message.candidate
        });

        pc.addIceCandidate(candidate);

    } else if (message.message === 'bye' && isStarted)
    {
        handleRemoteHangup();
    }
});

// 2. Client-->Server

function sendMessage(message) 
{
    socket.emit('message', message);
}

// Channel negotiation trigger function
function checkAndStart() 
{
    if (!isStarted && typeof localStream != 'undefined' && isChannelReady)
    {
        createPeerConnection();
        pc.addStream(localStream);
        isStarted = true;
        if (isInitiator) 
        {
            console.log('Calling other peer..');
            doCall();
        }
    }
}

// PeerConnection management...
function createPeerConnection() {
    try {
        pc = new RTCPeerConnection(iceServers, pc_constraints);
        pc.addStream(localStream);
        pc.onicecandidate = handleIceCandidate;

        console.log('Created RTCPeerConnection with:\n' + ' config: \'' + JSON.stringify(iceServers) + '\';\n' +
            ' constraints: \'' + JSON.stringify(pc_constraints) + '\'.');
    } catch (e) {
        console.log('Failed to create PeerConnection, exception: ' + e.message);
        alert('Cannot create RTCPeerConnection object.');
        return;
    }

    pc.onaddstream = handleRemoteStreamAdded;
    pc.onremovestream = handleRemoteStreamRemoved;

    if (isInitiator) {
        try {
            // Create a reliable data channel
            sendChannel = pc.createDataChannel("sendDataChannel", {reliable: true});
            console.log("Send channel: ", sendChannel);
            console.trace('Created send data channel');
        } catch (e) {
            alert('Failed to create data channel. ');
            console.trace('createDataChannel() failed with exception: ' + e.message);
        }

        sendChannel.onopen = handleSendChannelStateChange;
        sendChannel.onmessage = handleMessage;
        sendChannel.onclose = handleSendChannelStateChange;
    } else { // Joiner
        pc.ondatachannel = gotReceiveChannel;
    }
}

// Data channel management
function sendData(){
    var data = dataChannelSend.value;
    if(isInitiator){
        sendChannel.send(data);
    } else {
        receiveChannel.send(data);
    }
    console.trace('Send data: ' + data);
}

// Handlers..
function gotReceiveChannel(event) {
    console.trace('Receive Channel Callback');
    receiveChannel = event.channel;
    receiveChannel.onmessage = handleMessage;
    receiveChannel.onopen = handleReceiveChannelStateChange;
    receiveChannel.opclose = handleReceiveChannelStateChange;
}

function handleMessage(event) {
    console.trace('Received message: ' + event.data);
    dataChannelReceive.value += event.data + '\n';
}

function handleSendChannelStateChange() {
    var readyState = sendChannel.readyState;
    console.trace('Send channel state is: ' + readyState);

    // If channel ready, enable user's input
    if(readyState == 'open'){
        dataChannelSend.disabled = false;
        dataChannelSend.focus();
        dataChannelSend.placeholder = "";
        sendButton.disabled = false;
    } else {
        dataChannelSend.disabled = true;
        sendButton.disabled = true;
    }
}

function handleReceiveChannelStateChange() {
    var readyState = receiveChannel.readyState;
    console.trace('Receive channel state is: ' + readyState);

    // If channel ready, enable user's input
    if(readyState == 'open'){
        dataChannelSend.disabled = false;
        dataChannelSend.focus();
        dataChannelSend.placeholder = "";
        sendButton.disabled = false;
    } else {
        dataChannelSend.disabled = true;
        sendButton.disabled = true;
    }
}

// ICE candidates management
function handleIceCandidate(event) {
    console.log('handleIceCandidate event: ', event);

    if(event.candidate){
        sendMessage({
            type: 'candidate',
            label: event.candidate.sdpMLineIndex,
            id: event.candidate.sdpMid,
            candidate: event.candidate.candidate,
            channel: room,
            //TODO: remove this and fix
            sd: ''
        });
    } else {
        console.log('End of candidates');
    }
}

// Create offer
function doCall() {
    console.log('Creating offer..');
    pc.createOffer(setLocalAndSendMessage, onSignalingError, sdpConstraints);
}

//Signaling error handler
function onSignalingError(error) {
    console.log('Failed to create signaling message: ' + error.name);
}

//Create Answer
function doAnswer() {
    console.log('Sending answer to peer');
    pc.createAnswer(setLocalAndSendMessage, onSignalingError, sdpConstraints);
}

// Success handler for both createOffer() and createAnswer()
function setLocalAndSendMessage(sessionDescription) {
    pc.setLocalDescription(sessionDescription);
    sendMessage({
        sd: sessionDescription,
        channel: room
    });
}

// Remote stream handlers..
function handleRemoteStreamAdded(event) {
    console.log('Remote stream added: ', event);
    attachMediaStream(remoteVideo, event.stream);
    console.log('Remote stream attached!');
    remoteStream = event.stream;
}

function handleRemoteStreamRemoved(event) {
    console.log('Remote stream removed. Event: ', event);
}

//Clean-up functions..
function hangup() {
    console.log('Hanging up');
    stop();
    sendMessage({
        message: 'bye',
        channel: room
    });
}

function handleRemoteHangup() {
    console.log('Session terminated');
    stop();
    isInitiator = false;
}

function stop() {
    isStarted = false;
    if(sendChannel){
        sendChannel.close();
    }
    if(receiveChannel){
        receiveChannel.close();
    }
    if(pc){
        pc.close();
    }
    pc = null;
    sendButton.disabled = true;
}













