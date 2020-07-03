import { App, LogLevel } from '@slack/bolt';

import { EventType, ActionId } from './enums';
import { homeUiBlockKit, exampleModalUiBlockKit } from './constants';
import { QAJson } from './resources/QA'

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
	const answer = QAJson.find(item => item.question === command.text).answer
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
