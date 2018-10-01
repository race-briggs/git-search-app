'use strict';

const searchEndPoint = 'https://api.github.com/users/:';

/* function formatQuery(params) {
	const queryTerm = Object.keys(params).map(key => `${key}=${params[key]}`);
	return queryTerm.join('&');
}*/

function displayResults(responseJson, maxResults) {
	console.log(responseJson);
	$('.js-results-list').empty();

	$('.js-results-list').append(
		`
		`
		);
}

function getRepos(query, maxResults) {

	const url = searchEndPoint + query + '/repos';

	const options = {
		headers: new Headers({
			"Accept": application/vnd.github.v3+json
		});
	};

	fetch(url, options)
		.then(response => if(response.ok){
			return response.json();
		} else {
			throw new Error(response.statusText);
		})
		.then(responseJson => displayResults(responseJson, maxResults))
		.catch(e => {
			$('.error-message').text(`An Error Occurred: ${e.message}`);
		});
}

function watchForm() {
	$('form').submit(event => {
		event.preventDefault();
		const searchTerm = $('.js-search').val();
		const maxResults = $('.js-max-results').val();
		getRepos(searchTerm, maxResults);
	});
}