var builder = require('botbuilder');

var connector = new builder.ConsoleConnector().listen();
var bot = new builder.UniversalBot(connector);
var intents = new builder.IntentDialog();
bot.dialog('/', intents);

intents.matches(/^change name/i, [
  (session) => {
    session.beginDialog('/profile');
  },
  (session, results) => {
    session.send('Ok... Changed your name to %s', session.userData.name);
  }
]);

intents.onDefault([
  (session, args, next) => {
    if (!session.userData.name) {
      session.beginDialog('/profile');
    } else {
      next();
    }
  },
  (session, results) => {
    session.send('Hello %s!', session.userData.name);
  }
]);

bot.dialog('/profile', [
  (session) => {
    builder.Prompts.text(session, 'Hi! What is your name?');
  },
  (session, results) => {
    session.userData.name = results.response;
    session.endDialog();
  }
]);

