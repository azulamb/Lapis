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
$ cd /home/lapis/
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
# npm i -g forever
```

```
$ forever stop lapis.js
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

Action.

```
exports.exec = function( lapis, channel, message ){
	// Action.
	// If you need slack, use "lapis.slack".
	// You can send message "channel.send()".
	// You can get message text "message.text".
}
```
