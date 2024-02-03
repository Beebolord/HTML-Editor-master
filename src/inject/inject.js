class Question { 
	constructor(question, answers) { 
		this.question  = question 
		this.answers = answers
	}
}
var result = [];
let something; 
var all_answers = [];
const url = chrome.runtime.getURL('./config/database.json');
var somethings = document.getElementsByClassName("formulation clearfix");
var questions  = document.getElementsByClassName("qtext")
var answers  = document.getElementsByClassName("answer")
var single_answers = document.getElementsByClassName("flex-fill ml-1")	
let question;

async function fetchData(question) {
	var test_array = []
	let OPENAI_API_KEY = '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'; // Replace with your actual OpenAI API key
	let apiUrl = 'https://api.openai.com/v1/chat/completions'; 
	let headers = {
	  'Content-Type': 'application/json',
	  'Authorization': `Bearer ${OPENAI_API_KEY}`
	};
	const requestData = {
	  model: 'gpt-3.5-turbo',
	  messages: [
		{
		  role: 'system',
		  content: "You solve the question I sent you. and return the corrent answer, including the prefix letter. but add nothing nothing else! " 
		},
		{
		  role: 'user',
		  content: (question.question+question.answers + "Return the entire value of the choice NOT ONLY THE LETTER.")
		}
	  ]
	};
	try {
	  const response = await fetch(apiUrl, {
		method: 'POST',
		headers: headers,
		body: JSON.stringify(requestData)
	  });
  
	  if (!response.ok) {
		throw new Error(`HTTP error! Status: ${response.status}`);
	  }
  
	  const responseData = await response.json();
	  console.log(responseData.choices[0].message.content);
	  test_array.push(responseData.choices[0].message.content)
	  console.log("I WANT TO LOG"+test_array[0].substring(3))

	  for (var i = 0; i <= single_answers.length; i++) {
		console.log(single_answers[i].textContent)
		if(single_answers[i].textContent == test_array[0].substring(3))  {
			single_answers[i].style.boxShadow =  '0 0 2px rgba(0, 0, 0, 0.2)';
		}
		}
	} catch (error) {
	  console.error('Error during fetch:', error);
	}
	test_array[0].substring(3)
	
  };
	chrome.runtime.sendMessage(something);
	// Selenium Faker
	
	for (var i = 0; i < somethings.length; i++) {
   		question = new Question(
			questions[i].textContent,
			answers[i].textContent 
		)
		console.log(question)
		result.push(question)
		fetchData(question)
	};