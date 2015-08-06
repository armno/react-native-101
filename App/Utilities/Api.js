module.exports = (function(){

	/**
	 * GitHub base API endpoint
	 * @type {String}
	 */
	const endpoint = 'https://api.github.com';

	/**
	 * Firebase API endpoint (for this app)
	 * @type {String}
	 */
	const firebaseEndpoint = 'https://armno-github-notes.firebaseio.com';

	/**
	 * Exposed API
	 */
	return {
		getUser,
		getRepos,
		getNotes,
		addNote
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

	/**
	 * get username's notes from firebase
	 * @param  {string} username
	 * @return {promise}
	 */
	function getNotes(username) {
		let url = `${firebaseEndpoint}/${username}.json`;
		return fetch(url)
			.then((res) => res.json());
	}

	/**
	 * create new note item of the username on firebase
	 * @param {string} username
	 * @param {object} note
	 */
	function addNote(username, note) {
		let url = `${firebaseEndpoint}/${username}.json`;
		return fetch(url, {
			method: 'post',
			body: JSON.stringify(note)
		}).then((res) => res.json());
	}

})();
