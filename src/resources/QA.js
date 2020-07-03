const { google } = require('googleapis');

export const DEFAULT_QUESTIONS = [
	{
		question: 'What is my favourite colour?',
		answer: 'You really like blue',
		keywords: ['color']
	},
	{
		question: 'What is my favourite dance?',
		answer: 'You really like Salsa Dancing',
		keywords: ['dance']
	},
	{
		question: 'What is my favourite hat?',
		answer: 'You really like the Blue Jays hat',
		keywords: ['hat', 'fashion', 'wear']
	},
	{
		question: 'What is my favourite animal?',
		answer: 'You really like lions, tigers and bears, oh my!',
		keywords: ['animal', 'wildlife']
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
	
	try {
		const response = await sheet.spreadsheets.values.get(params);
		const { values } = response.data;
	
		const data = DEFAULT_QUESTIONS;
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
		return data;
	} catch(excp) {
		console.log('Error fetching the spreadsheet data');
	}
};
