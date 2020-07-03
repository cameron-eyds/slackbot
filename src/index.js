import { App, LogLevel } from '@slack/bolt';

import { EventType, ActionId } from './enums';
import { homeUiBlockKit, exampleModalUiBlockKit } from './constants';
import { QAJson } from './resources/QA'
import stopword from 'stopword';

const app = new App({
  token: process.env.SLACK_BOT_TOKEN,
  signingSecret: process.env.SLACK_SIGNING_SECRET,
  logLevel: process.env.NODE_ENV === 'development' && LogLevel.DEBUG,
});

// For serverless setup. Not yet configured.
export const handler = {};

/**
 * Example event (Messages).
 *
 * Listens to a specific wave emoji sent to the bot, and responds with a message back.
 */
app.message(':wave:', async ({ message, say }) => {
  say(`Hi, <@${message.user}>`);
});

app.message(':question:', async ({ message, say }) => {
	QAJson.forEach((item, index) => say(`${item.question}`));
});

app.message('', async ({ message, say }) => {
  const inputArray = message.text.toLowerCase().split(' ');
  const keywords = stopword.removeStopwords(inputArray);
  // TODO: Eventually, we probably don't want this pulling from just a JSON file
  const filtered = QAJson.reduce((matches, answer) => {
    const keywordIntersection = intersect(keywords, answer.keywords);
    if (keywordIntersection.length > 0) {
      answer.matches = keywordIntersection.length;
      matches.push(answer);
    }
    return matches;
  }, []);
  if (filtered.length > 0) {
    // TODO: Get the one with the most matches
    // If multiple matches, respond with clarification questions
    say(filtered[0].answer);
  } else {
    say('No answers, sorry :(')
  }
});

const intersect = (a, b) => {
  const setA = new Set(a);
  const setB = new Set(b);
  const intersection = new Set([...setA].filter(x => setB.hasIgnoreCase(x)));
  return Array.from(intersection);
}

Set.prototype.hasIgnoreCase = function(str) {
  return this.has(str) || this.has(str.toLowerCase());
}

/**
 * Example event (Home screen).
 *
 * Listens to the app home tab opened, and publishes a view.
 */
app.event(EventType.AppHomeOpened, async ({ context, event }) => {
  try {
    await app.client.views.publish({
      token: context.botToken,
      user_id: event.user,
      view: homeUiBlockKit,
    });
  } catch (error) {
    console.error(error.data.response_metadata);
  }
});

/**
 * Example command.
 *
 * Listens to a specific command, and responds with a message back containing the command text.
 */
app.command('/test', async ({ command, ack, say }) => {
  ack();
  say(`${command.text}`);
});

app.command('/question', async ({ command, ack, say }) => {
	const answer = QAJson.find(item => item.question.match(command.text)).answer
	ack();
	say(`${answer}`);
});

/**
 * Example action.
 *
 * Listens to the "Open Modal" button from home view click, and opens an example modal.
 */
app.action(ActionId.OpenModalButton, async ({ ack, context, body }) => {
  ack();
  try {
    await app.client.views.open({
      token: context.botToken,
      user_id: body.user.id,
      trigger_id: body.trigger_id,
      view: exampleModalUiBlockKit,
    });
  } catch (error) {
    console.error(error.data.response_metadata);
  }
});

/**
 * Start app.
 */
(async () => {
  const port = process.env.PORT || 3000;
  await app.start(port);
  console.log(`⚡️ Bolt app is running on port ${port}!`);
})();
