# Lapis

Lapis is Slack bot.

## Get token

https://api.slack.com/docs/oauth

### Step.1 Create application

https://***.slack.com/services/new

move DIY Integrations & Customizations

Click Bots view.

Add bot Integration.

## Environment variable

### Windows

```
set SLACK_LAPIS_TOKEN=[SLACK TOKEN]
```

### Linux

```
$ vi ~/.bashrc
export SLACK_LAPIS_TOKEN="- TOKEN -"
```

or

```
export SLACK_LAPIS_TOKEN="- TOKEN -"
```

## Install

### node

```
# yum install epel-release
yum install nodejs npm --enablerepo=epel
```

### Create dir
```
# adduser -s /sbin/nologin lapis
or
$ mkdir /home/lapis
```

### Clone

```
$ cd /home/lapis/
$ git clone https://github.com/HirokiMiyaoka/Lapis.git
```

### Prepare

```
$ cd /home/lapis/Lapis
$ npm i
```

## Service

### Service start

```
$ npm run service
```

or

```
forever start /home/lapis/Lapis/lapis.js -l /home/lapis/Lapis/log
```

or

```
node lapis.js
```

### Service stop

#### Install forever

```
# npm run stop
```

or 

```
# npm i -g forever
```

```
$ forever stop lapis.js
```

### Look log

```
$ forever logs lapis.js
```

## Add script

Create script in script dir.

Filename is *.js.

### Function

You need function.

### isMatch

Analysis message.

Return true if you want to anything.

```
exports.isMatch = function( msg ){ return true or false; }
```

### exec

Action.

```
exports.exec = function( lapis, channel, message ){
	// Action.
	// If you need slack, use "lapis.slack".
	// You can send message "channel.send()".
	// You can get message text "message.text".
}
```

## Post from out side.

Lapis stand server, 127.0.0.1:SLACK_LAPIS_PORT.

SLACK_LAPIS_PORT is environment variable or 12345.

You can connect and send JSON to this server.

```
var net = require('net');

var options = {};
options.host = '127.0.0.1';
options.port = process.env.SLACK_LAPIS_PORT || 12345;

var client = net.connect( options );

client.on( 'error', function( e )
{
	console.error( 'Failed ... ' + options.host + ':' + options.port );
	console.error( e.message );
});

client.on('connect', function()
{
	console.log( 'Connection ... ' + options.host + ':' + options.port );
});

client.on('close', function()
{
	console.log( 'Client Closed' );
});

client.write('{"message":"Hey!"}');
client.end();
```

### JSON

```
{
	"message": "POST MESSAGE",
	"channel": "POST CHANNEL"
}
```

channel is option. (default general)
