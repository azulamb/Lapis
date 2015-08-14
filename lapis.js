var Slack = require('slack-client');
var fs = require('fs');

Lapis = {
	slack: null,
	scripts: [],

	start: function()
	{
		var self = this;
		// Slack setting
		var autoReconnect = true;
		var autoMark = true;

		self.slack = new Slack( process.env.SLACK_LAPIS_TOKEN || "", autoReconnect, autoMark );

		self.slack.on( 'open', function()
		{
			console.log( 'Ready Lapis ...' );
			self.loadScript( __dirname );
			self.getChannel( 'general' ).send( 'Hello!' );
		});

		self.slack.on( 'message', function( message )
		{
			var s;
			var channel = self.slack.getChannelGroupOrDMByID( message.channel );
			var user = self.slack.getUserByID(message.user);
			for ( s in self.scripts )
			{
				if ( self.scripts[ s ].isMatch( message.text ) ){ self.scripts[ s ].exec( self, channel, message ); }
			}
		});

		self.slack.on( 'error', function( error )
		{
			console.error( 'Error:', error );
		});

		self.slack.login();
	},

	loadScript: function( root )
	{
		var self = this;
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
					console.log( 'Load script ' + file + ( new Array( 57 - file.length ).join( ' ' ) ) + '... ' + ( add ? '[  OK  ]' : '[FAILED]') );
					if ( add ){ self.scripts.push( script ); }
				})( file );
			});
			console.log( 'Script loaded.' );
		});
	},

	getChannel: function( channel )
	{
		var channels = this.slack.channels;
		var ch;
		var general;
		for ( ch in channels )
		{
			if ( channels[ ch ].name === channel ){ general = ch; break; }
			if ( channels[ ch ].name === 'general' ){ general = ch; }
		}
		return this.slack.getChannelGroupOrDMByID( general );
	}
};

Lapis.start();
