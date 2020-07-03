const { google } = require('googleapis');

export const DEFAULT_QUESTIONS = [
	{
		question: 'Where can i find the passcode for the Bike room?',
		answer: 'If you have access to Teampass, Bike room lock combination is in the General folder',
		keywords: ['bike', 'passcode']
	},
	{
		question: 'How do i sign up for an office tour?',
		answer: 'Office tour is conducted by the JOSH team every Monday, please get in touch with Shannon to sign up!',
		keywords: ['office', 'tour']
	},
	{
		question: 'What are the FreshWorks guiding principles?',
		answer: 'Our 5 guiding principles are: Leadership, Engagement, Communication, Empathy, Loyalty',
		keywords: ['guiding', 'principles', 'leadership', 'engagement', 'communication', 'empathy', 'loyalty']
	},
	{
		question: 'What are the FreshWorks core values?',
		answer: 'Our 5 core values are: Commitment, Collaboration, Humility, Resourcefulness, Excellence',
		keywords: ['core', 'values', 'Commitment', 'Collaboration', 'Humility', 'Resourcefulness', 'Excellence']
	},
	{
		question: 'What items can or can’t be recycled??',
		answer: 'Each floor has a Recycling, Organics & Garbage station to help you properly dispose of your waste. There are bins for:\n' +
		'- Soft plastic\n' +
		'- Hard plastic & tins\n' +
		'- Compost bin\n' +
		'- Refundables (pop cans and drink bottles)\n' +
		'- Cardboard and paper\n' +
		'- Landfill (non-recylable items)\n' +
		'\n' +
		'If you are unsure, slack Sienna!',
		keywords: ['recycled', 'recycle', 'recycling']
		},
		{
		question: 'Who can help me with BitBucket setup?',
			answer: 'Please contact Kendall for any help needed with BitBucket setup.',
		keywords: ['setup', 'bitbucket']
		},
		{
		question: 'How can I print a document at the office??',
			answer: 'Printers are located on 2nd floor(Black and White) and 5th floor(Color). Just take your laptop with you, connect using the USB cable and print your document.',
		keywords: ['document', 'print', 'printing']
		},
		{
		question: 'Does Freshworks have a learning portal or resources?',
			answer: 'Yes, Freshworks have partnered with Udemy for learning and training needs. Login to Udemy(access code available on Team pass) and select the course you want to learn.',
		keywords: ['learning', 'udemy', 'resources']
		},
		{
		question: 'How far in advance should I book vacation?',
			answer: 'We’re flexible in approving time off when doing so does not interfere with company operations. As a general rule, we ask employees to provide at least 48 hours\' notice for short vacations that are up to two days. For longer vacations, we ask employees to provide at least one month of notice for each week of vacation (eg: two months\' notice for two weeks of vacation). Vacation days are granted only on a full-day or half-day basis.',
		keywords: ['vacation', 'time off', 'holiday']
		}
];

export const getQAJson = async () => {
	const sheet = google.sheets({
		version: 'v4',
		auth: process.env.GOOGLE_API_KEY
	});

	const params = {
		spreadsheetId: '1mZdIv-IlEk2t7Q5Pf8dSpM-hYGyb0V1js4J6CwKzgg8',
		range: 'Sheet1!B:D'
	};

	const data = DEFAULT_QUESTIONS;
	try {
		const response = await sheet.spreadsheets.values.get(params);
		const { values } = response.data;

		if (values && values.length) {
			for (const [question, answer, keywords] of values) {
				// ignoring the headers
				if (question.toLowerCase() === 'question') return;

				data.push({
					question,
					answer,
					keywords: keywords ? keywords.split(',') : ''
				});
			}
		}
	} catch(excp) {
		console.log('Error fetching the spreadsheet data');
	}
	return data;
};
