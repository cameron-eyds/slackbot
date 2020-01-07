import { ActionId } from '../enums';

export const homeUiBlockKit = {
  type: 'home',
  blocks: [
    {
      type: 'section',
      text: {
        type: 'mrkdwn',
        text: 'You can start a new review by clicking the button below',
      },
    },
    {
      type: 'actions',
      elements: [
        {
          type: 'button',
          action_id: ActionId.CreateReviewButton,
          style: 'primary',
          text: {
            type: 'plain_text',
            text: 'Create Review',
            emoji: true,
          },
        },
      ],
    },
  ],
};

export const createReviewUiBlockKit = {
  type: 'modal',
  callback_id: ActionId.CreateReviewModal,
  title: {
    type: 'plain_text',
    text: 'Create Review',
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
        text: 'Pick a deadline for the review.',
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
        text: 'Pick user(s) to send the review to',
      },
      accessory: {
        action_id: 'text1234',
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
        text: 'Question(s)',
        emoji: true,
      },
    },
  ],
};
