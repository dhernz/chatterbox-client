// YOUR CODE HERE:
var app = {
	init : function(){
		$(document).ready(function() {
			// first thing: see previous messages
			app.fetch();	
			app.handleSubmit();
			$('#send').on('click', function(){
				//console.log($('#send').text());
				app.send('this message');
			});
		});
		var friendsArray = [];	
	},
	send : function(message){
		$.ajax({
			type: "POST",
			url: "https://api.parse.com/1/classes/chatterbox",
			data: JSON.stringify(message),
  			contentType: 'application/json',
  			success: function (data) {
    			console.log('chatterbox: Message sent');
  			},
  			error: function (data) {
    // See: https://developer.mozilla.org/en-US/docs/Web/API/console.error
    			console.error('chatterbox: Failed to send message');
  			}
		})
	},
	fetch: function(){
		$.ajax({
			type: "GET",
			url: "https://api.parse.com/1/classes/chatterbox",
			success: function(data){
				console.log(data);
			}
			// dataType: dataType
		});
	},
	clearMessages: function(){
		$('#chats').empty();
	},
	addMessage: function(message){

		var obj = {
			username: String(window.location.search.slice(10)+":"),
			text: message,
			roomname:"s"
		};
		//currently this adds the message of one user to the page
		//we want to add an anchor tag to allow the person who sent this 
		//message to get added to our friends array.
		$("#chats").append("<p>"+obj.username+" "+ obj.text+"</p>");
	
	},
	addRoom: function(roomname){
		$("#roomSelect").append('<option value="'+ roomname +'" />');
	},
	addFriend: function(username){
		var btn2 = $(".addFriend")
		btn2.on('click', function(){
			//here we will push into the friends array from the anchor in the message.
			//friendsArray.push()
		})
	},
	handleSubmit: function(){
		var btn = $("#send")
		btn.on('click',function(){
			var msm = $('#message').val();
			app.addMessage(msm)
			//console.log(msm);
		})
	},
};

app.init();

app.server = "https://api.parse.com/1/classes/chatterbox";	

