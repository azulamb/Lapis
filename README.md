# Lapis
Lapis is bot.

## Get token

https://api.slack.com/docs/oauth

### Step.1 Create application

https://api.slack.com/applications

### Get code

Access URL.

```
https://slack.com/oauth/authorize?client_id=CLIENT_ID&redirect_uri=REDIRECT_URL&scope=identify,read,post,client,admin
```

You can get Address.

```
http://lapis.azulite.net/redirect?code=CODE&state=
```

### Get token

Access URL.

```
https://slack.com/api/oauth.access?client_id=CLIENT_ID&client_secret=CLIENT_SECRET&code=CODE&redirect_uri=REDIRECT_URL
```

You can get token.

```
{"ok":true,"access_token":TOKEN,"scope":"identify,read,post,client,admin"}
```

## Environment variable

### Windows

```
set SLACK_LAPIS_TOKEN=[SLACK TOKEN]
```

## Service Start

Create directory /var/lapis/ and /var/lapis/log.

Clone Lapis.

```
npm run service
```
