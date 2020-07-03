import { ActionId } from '../enums';

export const homeUiBlockKit = {
  type: 'home',
  blocks: [
    {
      type: 'section',
      text: {
        type: 'mrkdwn',
        text: 'Click the button below to open a modal',
      },
    },
    {
      type: 'actions',
      elements: [
        {
          type: 'button',
          action_id: ActionId.OpenModalButton,
          style: 'primary',
          text: {
            type: 'plain_text',
            text: 'Open Modal',
            emoji: true,
          },
        },
      ],
    },
  ],
};

export const exampleModalUiBlockKit = {
  type: 'modal',
  callback_id: ActionId.ExampleModal,
  title: {
    type: 'plain_text',
    text: 'Example Modal',
    emoji: true,
  },
  submit: {
    type: 'plain_text',
    text: 'Submit',
    emoji: true,
  },
  close: {
    type: 'plain_text',
    text: 'Cancel',
    emoji: true,
  },
  blocks: [
    {
      type: 'section',
      text: {
        type: 'mrkdwn',
        text: 'Example date picker field',
      },
      accessory: {
        type: 'datepicker',
        initial_date: '1990-04-28',
        placeholder: {
          type: 'plain_text',
          text: 'Select a date',
          emoji: true,
        },
      },
    },
    {
      type: 'section',
      text: {
        type: 'mrkdwn',
        text: 'Example user select field',
      },
      accessory: {
        action_id: ActionId.ExampleModalUserSelect,
        type: 'multi_users_select',
        placeholder: {
          type: 'plain_text',
          text: 'Select users',
        },
      },
    },
    {
      type: 'input',
      element: {
        type: 'plain_text_input',
        multiline: true,
      },
      label: {
        type: 'plain_text',
        text: 'Example multiline text field',
        emoji: true,
      },
    },
  ],
};

export const homeUiMockUp = {
	type: 'home',
	blocks: [
		{
			type: 'section',
			text: {
				type: 'mrkdwn',
				text: 'Hello! Welcome to FreshFriend - You can get instant help and find answers regarding our\n new office, company policies, career development programs and cultures here.',
			},
		},
	],
};
