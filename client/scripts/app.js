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
		
		var obj = {
			username: String(window.location.search.slice(10)+":"),
			text: $('#message').val(),
			roomname: $('#roomoptions').className
		};
		console.log(obj);
		// console.log(sms);
		app.send(obj);
		
	});
	//this listener enables clearMessages to be clicked
	$('#clear').on('click', function(){
		app.clearMessages();
	});
	app.addRoom();
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
		console.log(data);
		console.log('chatterbox: Message sent');
		
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
			//if (value.roomname ===  )
			if (value.username === undefined || value.username === ""){ value.username = 'anonymous'; }
			value.text = (app.checkUp(value.text)) ? "Don't even try to hack us" : value.text
			value.username = (app.checkUp(value.username)) ? "Badguy" : value.username;
					//add each cleaned piece of data to the chat client.
			var usr = value.username;

		$("#chats").append('<label class='+ usr +' onclick="app.addFriend.call(this)">'+usr.toUpperCase() +'</label>');
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
		$("#localinfo").append("<label>"+obj.username.toUpperCase()+"</label>"+"<p>"+ obj.text+"</p>");
	},
	addRoom : function(){
		$('#newroom').on('click',function(){
			var roomInputName = $("#roomSelect").val();
			if (roomInputName === "") { 
				alert('You cannot add an empty room name'); 
			} else { 
				$("#roomoptions").append('<option class="'+ roomInputName  +'">'+roomInputName +'</option>');

			}

		});
	},
	addFriend : function(string){

		app.myFriendList[this.className] = true;
		this.style.color = "red";
		console.log(app.myFriendList);
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
app.myFriendList = {};
