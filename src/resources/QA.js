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
		question: 'What is my favourite food?',
		answer: 'You really like chicken, plain old chicken',
		keywords: ['food', 'dining']
	}
];

export const getQAJson = async () => {
	const sheet = google.sheets({
		version: 'v4',
		auth: process.env.GOOGLE_API_KEY
	});

	const params = {
		spreadsheetId: '1mZdIv-IlEk2t7Q5Pf8dSpM-hYGyb0V1js4J6CwKzgg8',
		range: 'Sheet1!B:C'
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
