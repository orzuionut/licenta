// // Set as global variable. TODO: refactor if possible
// let conversationID;

// $(document).ready(function(){

// 	let $conversations_box = $('.conversation-body');

// 	const _csrf = getCSRF();

// 	// Match all anchor tags with id like :conversation-id-{number}:
// 	$("div[id^='conversation-id-']").click(function(){

// 		$conversations_box.empty();

// 		conversationID = getConversationID(this);

// 		loadConversation(conversationID, _csrf, handleMessages);

// 	});


// });

// function getCSRF()
// {
// 	return $("[name='_csrf']").val();
// }


// function getConversationID(conversationDiv)
// {
// 	const id = $(conversationDiv).attr('id');
	
// 	return id.substring(id.lastIndexOf("-") + 1);
// }

// function loadConversation(conversationID, _csrf, handleMessagesCallback)
// {

// 	let data = {
// 		conversationID: conversationID,
// 		_csrf: _csrf
// 	};

// 	$.ajax({
//       type: "POST",
//       url: "/conversation/ajax",
//       data: data,
//       success: function(data){
//           handleMessagesCallback(data.messages, data.currentUser);
//       }
//   	});

// }

// function handleMessages(messages, currentUser)
// {
// 	const $conversations_box = $('.conversation-body');


// 	for(let i = 0; i < messages.length; i = i + 1)
// 	{
// 		createMessageBox(messages[i], $conversations_box, currentUser);		
// 	}

// }

// function createMessageBox(message, $conversations_box, currentUser)
// {
// 	let $message_box;

// 	if(message.user_id == currentUser.id)
// 	{
// 		$message_box = $("<div class='message-box message-user'>" + message.message + "</div>");

// 	} else
// 	{
// 		$message_box = $("<div class='message-box message-other'>" + message.user_name + " : " + message.message + "</div>");
// 	}
	

// 	$conversations_box.append($message_box);
// }