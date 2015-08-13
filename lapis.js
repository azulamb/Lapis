var Slack = require('slack-node');

slack = new Slack( process.env.SLACK_LAPIS_TOKEN || "" );

slack.api("users.list", function(err, response) {
  console.log(response);
});

slack.api('chat.postMessage', {
  text:'hello from nodejs', 
  channel:'#general'
}, function(err, response){
  console.log(response);
});