'use strict';

$(document).ready(function(){

    let nav = navigator;

    nav.getUserMedia = navigator.getUserMedia || navigator.mozGetUserMedia || navigator.webkitGetUserMedia;

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
    var pc_constraints = {
        optional: [
            {
                DtlsSrtpKeyAgreement: true
            }
        ]
    };

    var sdpConstraints = webrtcDetectedBrowser === 'firefox' ?
        {'offerToReceiveAudio':true,'offerToReceiveVideo':true } :
        {'mandatory': {'OfferToReceiveAudio':true, 'OfferToReceiveVideo':true }};


    var room = getIDfromURL();

    var socket = io.connect('http://localhost:8181/videocall');


    //From this point on, execution proceeds based on asynchronous events...

    function handleUserMedia(stream) {
        localStream = stream;
        attachMediaStream(localVideo, stream);

        sendMessage({
            message: 'got user media',
            channel: room
        });
        
        if (isInitiator) {
            checkAndStart();
        }
    }

    function handleUserMediaError(error) {
        console.log('navigator.getUserMedia error: ', error);
    }


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

        } catch (e) {
            console.log('Failed to create PeerConnection, exception: ' + e.message);
            alert('Cannot create RTCPeerConnection object.');
            return;
        }

        pc.onaddstream = handleRemoteStreamAdded;
        pc.onremovestream = handleRemoteStreamRemoved;

        if (isInitiator) {
            try {
                sendChannel = pc.createDataChannel("sendDataChannel", {reliable: false});

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
    }

    // Handlers..
    function gotReceiveChannel(event) {

        receiveChannel = event.channel;
        receiveChannel.onmessage = handleMessage;
        receiveChannel.onopen = handleReceiveChannelStateChange;
        receiveChannel.onclose = handleReceiveChannelStateChange;
    }

    function handleMessage(event) {
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
        pc.createOffer(setLocalAndSendMessage, onSignalingError, sdpConstraints);
    }

    //Signaling error handler
    function onSignalingError(error) {
        console.log('Failed to create signaling message: ' + error.name);
    }

    //Create Answer
    function doAnswer() {
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
        attachMediaStream(remoteVideo, event.stream);

        remoteStream = event.stream;
    }

    function handleRemoteStreamRemoved(event) {
        console.log('Remote stream removed. Event: ', event);
    }

    //Clean-up functions..
    function hangup() {
        stop();

        sendMessage({
            message: 'bye',
            channel: room
        });
    }

    function handleRemoteHangup() {
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

    function build()
    {
        if (room !== '') {
            socket.emit('create or join', room);
        }

        var constraints = {
            video: true,
            audio: true
        };

        nav.getUserMedia(constraints, handleUserMedia, handleUserMediaError);


        // Server-mediated message exchanging...

        // 1. Server-->Client...

        socket.on('created', function (room) {
            isInitiator = true;
        });

        socket.on('full', function (room) {
            console.log('Room ' + room + ' is full');
        });

        // Another peer is joining
        socket.on('join', function (room) {
            isChannelReady = true;
        });

        // This peer is joining room
        socket.on('joined', function (room) {
            isChannelReady = true;
        });

        // Receive message from the other peer via the signaling server
        socket.on('message', function (message) 
        {
            if (message.message == 'got user media') 
            {
                checkAndStart();

            } else if (message.message === 'bye' && isStarted)
            {
                handleRemoteHangup();
            }
            else if (message.sd && message.sd.type === 'offer')
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

            }
        });

    }

    build();

});


