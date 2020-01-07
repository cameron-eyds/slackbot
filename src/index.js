import { App, LogLevel } from '@slack/bolt';

import { EventType, ActionId } from './enums';
import { homeUiBlockKit, createReviewUiBlockKit } from './constants';

const app = new App({
  token: process.env.SLACK_BOT_TOKEN,
  signingSecret: process.env.SLACK_SIGNING_SECRET,
  logLevel: process.env.NODE_ENV === 'development' && LogLevel.DEBUG,
});

/**
 * Listen to specific message sent. -> Sends back "Hello" message.
 */
app.message(':wave:', async ({ message, say }) => {
  say(`Hello, <@${message.user}>`);
});

/**
 * Listen to App home opened. -> Publishes home view.
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
 * Listen to "Create Review" button from home view click. -> Opens "Create Review" modal.
 */
app.action(ActionId.CreateReviewButton, async ({ ack, context, body }) => {
  ack();
  try {
    await app.client.views.open({
      token: context.botToken,
      user_id: body.user.id,
      trigger_id: body.trigger_id,
      view: createReviewUiBlockKit,
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
