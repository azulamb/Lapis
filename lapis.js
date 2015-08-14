var Slack = require('slack-client');
var fs = require('fs');
var net = require('net');

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
			self.startServer();
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
	},

	startServer: function()
	{
		var self = this;
		var server = net.createServer();
		server.data = '';

		console.log( 'Prepare server ...' );

		server.on( 'connection', function( socket )
		{
			console.log( 'Server start ... ' + socket.remoteAddress + ':' + socket.remotePort );

			socket.on( 'data', function( chunk ) {
				server.data += chunk.toString();
			});

			socket.on( 'end', function( socket )
			{
				self.command( JSON.parse( server.data ) );
			});
		});

		server.on( 'listening', function() {
			var addr = server.address();
			console.log( 'Listening start on server ... ' + addr.address + ':' + addr.port );
		});

		process.on( 'SIGINT', function() {
			server.close();
			process.exit();
		});

		server.maxConnections = 3;
		server.listen( process.env.SLACK_LAPIS_PORT || 12345, '127.0.0.1' );
	},

	command: function( data )
	{
		if ( ! data.message ){ return; }
		self.getChannel( data.channel || 'general' ).send( data.message );
	}
};

Lapis.start();
