'use strict';

const searchEndPoint = 'https://api.github.com/users/';

/* function formatQuery(params) {
	const queryTerm = Object.keys(params).map(key => `${key}=${params[key]}`);
	return queryTerm.join('&');
}*/

function displayResults(responseJson, maxResults) {
	console.log(responseJson);
	$('.js-results-list').empty();

	for (let i = 0; i < responseJson.length & i < maxResults; i++) {
		$('.js-results-list').append(
			`<li class="result-li">
				<h3>${responseJson[i].name}</h3>
				<a href="${responseJson[i].html_url}">${responseJson[i].html_url}</a>
			</li>`
			);
	};
	$('#results').removeClass('hidden');
}

function getRepos(query, maxResults) {

	const url = searchEndPoint + query + '/repos';

	const options = {
		headers: new Headers({
			"Accept": "application/vnd.github.v3+json"
		})
	};

	fetch(url, options)
		.then(response => {
			if(response.ok){
				return response.json();
			} else {
				throw new Error(response.statusText);
			}
		})
		.then(responseJson => displayResults(responseJson, maxResults))
		.catch(e => {
			$('.error-message').text(`An Error Occurred: ${e.message}`);
		});
}

function watchForm() {
	$('#js-form').submit(event => {
		event.preventDefault();
		const searchTerm = $('.js-search').val();
		const maxResults = $('.js-max-results').val();
		getRepos(searchTerm, maxResults);
		$('.js-search').val("");
		$('.js-max-results').val("");
	});
}

$(watchForm);