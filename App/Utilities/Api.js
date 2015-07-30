module.exports = (function(){

	/**
	 * GitHub base API endpoint
	 * @type {String}
	 */
	const endpoint = 'https://api.github.com';

	/**
	 * Exposed API
	 */
	return {
		getUser,
		getRepos
	};

	// -- Implementaion Details

	/**
	 * get user info from username
	 * @param  {string} username
	 * @return {promise}
	 */
	function getUser(username) {
		let url = `${endpoint}/users/${username}`;
		return fetch(url)
			.then((res) => res.json());
	}

	/**
	 * get a list of repos belong to `username`
	 * @param  {string} username
	 * @return {promise}
	 */
	function getRepos(username) {
		let url = `${endpoint}/users/${username}/repos`;
		return fetch(url)
			.then((res) => res.json());
	}

})();
