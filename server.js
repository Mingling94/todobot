var builder = require('botbuilder');
var restify = require('restify');

//=========================================================
// Bot Setup
//=========================================================

// Setup Restify Server
var server = restify.createServer();
server.listen(process.env.port || process.env.PORT || 3978, function () {
  console.log('%s listening to %s', server.name, server.url); 
});
  
// Get secrets from server environment
var botConnectorOptions = { 
    appId: process.env.BOTFRAMEWORK_APPID, 
    appSecret: process.env.BOTFRAMEWORK_APPSECRET 
};

// Create chat bot
var connector = new builder.ChatConnector(botConnectorOptions);
var bot = new builder.UniversalBot(connector);
server.post('/api/messages', connector.listen());

// Serve a static web page
server.get(/.*/, restify.serveStatic({
  'directory': '.',
  'default': 'index.html'
}));

// Attempt to mimick echobot
bot.dialog('/', function (session) {
    //respond with user's message
    session.send("You said " + session.message.text);
});
/*
//=========================================================
// Bots Dialogs
//=========================================================

var intents = new builder.IntentDialog();
bot.dialog('/', intents);

intents.matches(/^change name/i, [
  function (session) {
    session.beginDialog('/profile');
  },
  function (session, results) {
    session.send('Ok... Changed your name to %s', session.userData.name);
  }
]);

intents.onDefault([
  function (session, args, next) {
    if (!session.userData.name) {
      session.beginDialog('/profile');
    } else {
      next();
    }
  },
  function (session, results) {
    session.send('Hello %s!', session.userData.name);
  }
]);

bot.dialog('/profile', [
  function (session) {
    builder.Prompts.text(session, 'Hi! What is your name?');
  },
  function (session, results) {
    session.userData.name = results.response;
    session.endDialog();
  }
]);
*/
