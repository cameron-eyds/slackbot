# FreshWorks Slack

This codebase is a JavaScript boilerplate for creating Slack apps. It uses
 [@slack/bolt](https://slack.dev/bolt/concepts) - a wrapper for the [Slack API](https://api.slack.com/).

And it contains the following development tooling:

- [ESLint](https://eslint.org/)
- [Babel](https://babeljs.io/)
- [Nodemon](https://nodemon.io/)

#### Developers:

Jared Jewitt, Ashton Meuser

## Getting Started

1. Go [here](https://slack.dev/bolt/tutorial/getting-started) and follow steps 1 and 2. Once you are finished, copy
your bot token and signing secret.

2. Rename the `.env.example` file to `.env` and add paste the two keys into their respected variables: 
`SLACK_BOT_TOKEN` and `SLACK_SIGNING_SECRET`.

3. Start the app locally by running `npm install` (if you haven't already), then the command `npm run start` in the
 root project directory.

4. Create a public URL of your localhost. I recommend using [ngrok](https://ngrok.com/). The steps on their
 website should be fairly straight forward.
 
 #### Setting up home screen
 
- Depending on your app, you may want a home screen. If you do, in
 [app management page](https://api.slack.com/apps), click "App Home" and turn on the toggle.

#### Setting up events

1. In your [app management page](https://api.slack.com/apps), click "Event Subscriptions", and turn on the toggle.

2. Enter your exposed public URL followed by `/slack/events`. So your full request URL would be
 something like: `https://xxxxxxxx.ngrok.io/slack/events`. 
 
3. After your request URL is verified, scroll down to *Subscribe to Bot Events*. Add any events you want your bot to
 listen to. This boilerplate is set up to listen to `message.im` and `app_home_opened`. Feel free to add/remove these
 if depending on the scope of your app.
 
4. Save your changes.

#### Setting up actions

1. In your [app management page](https://api.slack.com/apps), click "Interactive Components", and turn on the toggle.

2. Enter your exposed public URL followed by `/slack/events`. and save the changes.

#### Setting up slash commands

1. In your [app management page](https://api.slack.com/apps), click "Slash Commands", and click the "Create New
 Command" button. Enter the command and the other fields.
 
 2. Under "Request URL", enter your exposed public URL followed by `/slack/events`. and save the new command.

## Commands

| Command           | Description                                               |
|-------------------|-----------------------------------------------------------|
| npm run start     | Runs the server locally with hot reloading                |
| npm run build     | Builds the application                                    |
| npm run serve     | Runs the built application *Must run command above first  |
| npm run lint      | Identifies linting warnings/errors                        |
| npm run lint:fix  | Fixes linting errors                                      |

## Testing

This section of the boilerplate is still a W.I.P.

## Deployment

This section of the boilerplate is still a W.I.P.

- This application would make a perfect use case of [Serverless Architecture](https://serverless.com/). A `serverless
.yml` file has already been created, however it is ***not*** finalized.
