var Slack = require('slack-client');

// Slack setting
var autoReconnect = true;
var autoMark = true;

var slack = new Slack( process.env.SLACK_LAPIS_TOKEN || "", autoReconnect, autoMark);

slack.on( 'open', function()
{
	console.log( 'Ready Lapis...' );
});

slack.on( 'message', function(message)
{
	console.log("msg",message.text);
	var channel = slack.getChannelGroupOrDMByID( message.channel );
	var user = slack.getUserByID(message.user);
	channel.send( "Hello." );
});

slack.on( 'error', function(error)
{
	console.error( 'Error:', error );
});

slack.login();
