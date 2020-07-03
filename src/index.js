import { App, LogLevel } from '@slack/bolt';

import { EventType, ActionId } from './enums';
import { getQAJson, DEFAULT_QUESTIONS } from './resources/QA';
import { homeUiBlockKit, exampleModalUiBlockKit, homeUiMockUp } from './constants';
import stopword from 'stopword';
import natural from 'natural';

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
  const QAJson = DEFAULT_QUESTIONS;
	QAJson.forEach((item, index) => say(`${item.question}`));
});

app.message('', async ({ message, say }) => {
  const QAJson = DEFAULT_QUESTIONS;
  const tokenizer = new natural.WordTokenizer();
  const keywords = stopword.removeStopwords(tokenizer.tokenize(message.text.toLowerCase()));
  // TODO: Eventually, we probably don't want this pulling from just a JSON file
  const filtered = QAJson.reduce((matches, answer) => {
    const keywordIntersection = intersect(keywords, answer.keywords);
    if (keywordIntersection.length > 0) {
      if (matches[keywordIntersection.length] !== undefined) {
        matches[keywordIntersection.length].answers.push(answer);
      } else {
        matches[keywordIntersection.length] = {
          answers: [answer]
        }
      }
    }
    return matches;
  }, {});
  if (Object.keys(filtered).length > 0) {
    const matches = Object.keys(filtered).map(numMatches => parseInt(numMatches, 10));
    const maxMatches = Math.max(...matches);
    const answersToGive = filtered[maxMatches].answers;
    if (answersToGive.length > 1) {
      const blocksIntro = [{
        type: 'section',
        text: {
          type: 'plain_text',
          text: 'Were you wondering about the following questions?'
        }
      }]
      const answersBlocks = answersToGive.map(answer => {
        return {
          type: 'section',
          text: {
            type: 'mrkdwn',
            text: `\`${answer.question}\``
          }
        };
      });
      const blocks = [...blocksIntro, ...answersBlocks];
      console.log(blocks);
      await say({
        blocks
      })
    } else {
      say(answersToGive[0].answer);
    }
  } else {
    say('No answers, sorry :(');
  }
});

const intersect = (a, b) => {
  const setA = new Set(a);
  const setB = new Set(b);
  const intersection = new Set([...setA].filter(x => setB.hasIgnoreCase(x)));
  return Array.from(intersection);
};

Set.prototype.hasIgnoreCase = function(str) {
  return this.has(str) || this.has(str.toLowerCase());
};

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
  const QAJson = await getQAJson();
	const answer = QAJson.find(item => item.question.match(command.text)).answer;
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
