# Lapis
Lapis is bot.

## Get token

https://api.slack.com/docs/oauth

### Step.1 Create application

https://azulite.slack.com/services/new

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

### clone

```
$ cd /home/lapis/
$ git clone https://github.com/HirokiMiyaoka/Lapis.git
```

### Prepare

```
$ cd /home/lapis/
$ npm i
```

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

```
# npm i -g forever
```

```
$ forever stopall
```