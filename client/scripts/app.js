// ROOMS : Let user create rooms
// SOCIALIZING : 
var app = {
	//this function makes a new chat application for us
	init : function(){
	//the new app will need to wait until the rest of the page is loaded
		$(document).ready(function() {
	// first thing: see previous messages & refresh every 3 seconds
			setInterval(app.fetch,3000);
	//this powers the event listener for the text submission
			app.handleSubmit();
	//this listener enables send to be clicked
			$('#send').on('click', function(){
				app.send('this message');
			});
	//this listener enables clearMessages to be clicked
			$('#clear').on('click', function(){
				app.clearMessages();
			});
		});

	},
	send : function(message){
		$.ajax({
	//Reformat this
				type: "POST", 	
				url: "https://api.parse.com/1/classes/chatterbox",
	//data needs to include message text, username, date, and roomname
				data: JSON.stringify(message),
				contentType: 'application/json',
				success: function (data) {
					console.log('chatterbox: Message sent');
					app.fetch();
					console.log(data);
				},
				error: function (data) {
	    		// See: https://developer.mozilla.org/en-US/docs/Web/API/console.error
	    		console.error('chatterbox: Failed to send message');
	    	}
	    })
	},
	//This function retrieves and parses the data from our server
	//Some of the data is malicious, so we have a regular expression check in place to remove scripts.
	fetch : function(){
		$.ajax({
			type: "GET",
			url: "https://api.parse.com/1/classes/chatterbox",
			success: function(data){
		// when obtaining the data, run each to process each data point.
				_.each(data.results, function(value){
					value.text = (app.checkUp(value.text)) ? "Don't even try to hack us" : value.text
					if (value.username === undefined || value.username === ""){ value.username = 'anonymous'; }
					//if (value) 
					//add each cleaned piece of data to the chat client.
					// $("#serverInfo").append("<label> <input type="button" value ='' 'app.addFriend("+ value.username +")'>"  + value.username.toUpperCase() +'</label>'
					// 	+"<p>"+ value.text+"</p>");


					$("#chats").append('<label>'+value.username.toUpperCase() +'</label>');
					$("#chats").append('<input type="button" value="Add Friend">');
					$("#chats").append("<p>"+ value.text+"</p>");

				})
			}
		}) 
	console.log('I AM FETCHING !');
	},
	//this function will clear messages
	clearMessages : function(){
		$('#chats').empty();
	},
	addMessage : function(message){
		var obj = {
			username: String(window.location.search.slice(10)+":"),
			text: message,
			roomname:"s"
		};
		//We need to reformat the addMessage to collection username, message, and roomname.
		//Currently, it only collects a message.
		//We have access to the username from the String(window.location.search.slice(10))
		//We need to build out the roomname variable.
		$("#chats").append("<label>"+obj.username.toUpperCase()+"</label>"+"<p>"+ obj.text+"</p>");
	},
	addRoom : function(roomname){
		$("#roomSelect").append('<option value="'+ roomname +'" />');
	},
	addFriend : function(username){
		var btn2 = $(".addFriend")
		btn2.on('click', function(){
		//here we will push into the friends array from the anchor in the message.
		//friendsArray.push();
		})
	},
	handleSubmit : function(){
		var btn = $("#send")
		btn.on('click',function(){
			var msm = $('#message').val();
			app.addMessage(msm)
		//console.log(msm);
		})
	},
	checkUp : function(text) {
		if (text === undefined) { return false; }
		return text.match(/[-[\]{}\$()*+;,\\^$|#\s]/g, "\\$&");
	}
};

app.init();
app.server = "https://api.parse.com/1/classes/chatterbox";	

