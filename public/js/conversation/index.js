window.onload = function() {
     var getNode = function (s) {
         return document.querySelector(s);
     },
    //Get required nodes
    textarea = getNode('.chat textarea'),
    chatName = getNode('.chat-name');
    statusNode = getNode('.chat-status span');
    statusDefault = statusNode.innerHTML;
    messagesVar = getNode('.chat-messages');

    setStatus = function(s){
        statusNode.textContent = s;

        if(s !== statusDefault){
            var delay = setTimeout(function(){
                setStatus(statusDefault);
            }, 3000);
        }
    };

    setStatus('Testing');

    console.log("Status " + statusDefault);

    try{
        var socket = io.connect('http://localhost:8181/chat');
    }catch(e) {
        // Set status to warn user
    }

    if(socket !== undefined){
        //Listen for Output
        socket.on('output', function(data){
            if(data.length){
                //Loop through the results
                for(var x = 0; x < data.length; x++){
                    var message = document.createElement('div');
                    message.setAttribute('class','chat-message');
                    message.innerHTML = data[x].name + ":" + data[x].message;

                    // Apppend
                    messagesVar.appendChild(message);
                    messagesVar.insertBefore(message, messagesVar.firstChild);
                }
            }
        });

        //Listen for a status
        socket.on('status', function(data){
            setStatus((typeof data === 'object') ? data.message : data);

            if(data.clear === true){
                textarea.value = '';
            }
        });

        console.log('Connection Succeed');

        textarea.addEventListener('keydown', function (event) {
            var self = this,
                name = chatName.value;

            // If enter is pressed and not the CTRL at the same time
            if(event.which === 13 && event.ctrlKey === false ){
                socket.emit('input', {
                    name: name,
                    message: self.value
                });
                
                event.preventDefault();
            }
        });
    }
};