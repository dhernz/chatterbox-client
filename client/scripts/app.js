// YOUR CODE HERE:
var app = {

	init : function(){

	},
	send : function(message){
		$.ajax({
			type: "POST",
			// url: url,
			data: JSON.stringify(message)
			// success: success,
			// dataType: dataType
		})
	},

	fetch: function(){
		$.ajax({
			// url: url,
			// data: data,
			// success: success,
			// dataType: dataType
		});
	},
	clearMessages: function(){
		$('#chats').empty();
	},

	addMessage: function(message){
		// var chat = document.getElementById('chats') 
		// chat.innerHTML = message;

		$("#chats").append("<p>"+message.username+" "+message.text+" "+ message.roomname+"</p>")
	},
	addRoom: function(roomname){
		$("#roomSelect").append('<input type="text" name="'+ roomname +'" />');
	}

};
