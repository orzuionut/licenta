$(document).ready(function(){

	class Videocall
	{
		
	}

	class VideocallDOM
	{
		constructor()
		{

		}

	}

	class PeerConnection
	{
		setConstraints(constraints)
		{
			this.constraints = constraints;
		}

		create()
		{
			try 
			{
		        pc = new RTCPeerConnection(iceServers, pc_constraints);
		        pc.addStream(localStream);
		        pc.onicecandidate = handleIceCandidate;

		    } catch (e)
		    {
		        console.log('Failed to create PeerConnection, exception: ' + e.message);
		        alert('Cannot create RTCPeerConnection object.');
		        return;
		    }

		    pc.onaddstream = handleRemoteStreamAdded;
		    pc.onremovestream = handleRemoteStreamRemoved;

		    if (isInitiator)
		    {
		        try 
		        {
		            sendChannel = pc.createDataChannel("sendDataChannel", {reliable: true});

		        } catch (e) 
		        {
		            alert('Failed to create data channel. ');
		            console.trace('createDataChannel() failed with exception: ' + e.message);
		        }

		        sendChannel.onopen = handleSendChannelStateChange;
		        sendChannel.onmessage = handleMessage;
		        sendChannel.onclose = handleSendChannelStateChange;

		    } else 
		    { 
		        pc.ondatachannel = gotReceiveChannel;
		    }
		}

		makeCall()
		{
			this.pc.createOffer(setLocalAndSendMessage, onSignalingError, sdpConstraints);
		}

		// Success handler for both createOffer() and createAnswer()
	    setLocalAndSendMessage(sessionDescription) {
	        this.pc.setLocalDescription(sessionDescription);
	        sendMessage({
	            sd: sessionDescription,
	            channel: room
	        });
	    }

	    // Channel negotiation trigger function
	    checkAndStart() 
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

	}

	class UserMedia
	{
		constructor(constraints)
		{
			this.constraints = constraints;
		}

		get()
		{
			navigator.getUserMedia(this.constraints, this.handleSucces, this.handleError);
		}

		handleSuccess()
		{

		}

		handleError(error)
		{
			//
		}
	}


	function build()
	{

		// instantiate classes

		// socket io listeners

		// DOM listeners

	}

	build();
}
