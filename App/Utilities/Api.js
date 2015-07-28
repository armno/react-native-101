var Api = {
	getUser: function(username) {
		var url = `https://api.github.com/users/${username}`;
		return fetch(url)
			.then((res) => res.json());
	},
	getRepos: function(username) {
		var url = `https://api.github.com/users/${username}/repos`;
		return fetch(url)
			.then((res) => res.json());
	}
}

module.exports = Api;
