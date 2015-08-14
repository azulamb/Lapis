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
$ mkdir lapis
```

### clone

```
$ cd /home/lapis/
$ git clone https://github.com/HirokiMiyaoka/Lapis.git
```

## Service Start

Create directory /var/lapis/ and /var/lapis/log.

Clone Lapis.

```
npm run service
```
