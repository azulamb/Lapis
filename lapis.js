var Slack = require('slack-client');
var fs = require('fs');
var scripts = [];

function Start()
{
	// Slack setting
	var autoReconnect = true;
	var autoMark = true;

	var slack = new Slack( process.env.SLACK_LAPIS_TOKEN || "", autoReconnect, autoMark);

	slack.on( 'open', function()
	{
		console.log( 'Ready Lapis ...' );
		LoadScript( __dirname );
	});

	slack.on( 'message', function( message )
	{
		var s;
		var channel = slack.getChannelGroupOrDMByID( message.channel );
		var user = slack.getUserByID(message.user);
		for ( s in scripts )
		{
			if ( scripts[ s ].isMatch( message.text ) ){ scripts[ s ].exec( slack, channel, message ); }
		}
	});

	slack.on( 'error', function( error )
	{
		console.error( 'Error:', error );
	});

	slack.login();
}

function LoadScript( root )
{
	var dir = root + '/script/';
	fs.readdir( dir, function( err, files )
	{
		if ( err ){ throw err; }

		files.filter( function( file )
		{
			return fs.statSync( dir + file ).isFile() && /.*\.js$/.test( file );
		}).forEach( function ( file )
		{
			// Load script.
			(function( file )
			{
				var script = require( dir + file );
				var add = script.isMatch && script.exec;
				console.log( 'Load script ' + file + ' ... ' + ( add ? '[  OK  ]' : '[FAILED]') );
				if ( add ){ scripts.push( script ); }
			})( file );
		});
	});
}

Start();
