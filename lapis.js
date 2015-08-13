var Slack = require('slack-node');

slack = new Slack( process.env.SLACK_LAPIS_TOKEN || "" );

