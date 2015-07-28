var React = require('react-native');
var Profile = require('../Profile/Profile');

var {
	Text,
	View,
	StyleSheet,
	Image,
	TouchableHighlight
} = React;

var styles = StyleSheet.create({
	container: {
		marginTop: 65,
		flex: 1
	},
	image: {
		height: 350
	},
	buttonText: {
		fontSize: 24,
		color: 'white',
		alignSelf: 'center'
	},
	button: {
		flexDirection: 'row',
		alignSelf: 'stretch',
		justifyContent: 'center',
		flex: 1
	},
	buttonProfile: {
		backgroundColor: '#2c3e50'
	},
	buttonRepos: {
		backgroundColor: '#c0392b'
	},
	buttonNotes: {
		backgroundColor: '#f39c12'
	}
});

class Dashboard extends React.Component {

	goToProfile() {
		console.log('go to profile');
		this.props.navigator.push({
			title: 'Profile Page',
			component: Profile,
			passProps: {
				userInfo: this.props.userInfo
			}
		})
	}

	goToRepos() {
		console.log('go to repo');
	}

	goToNotes() {
		console.log('go to notes');
	}

	render() {
		return (
			<View style={styles.container}>
				<Image source={{ uri: this.props.userInfo.avatar_url }}
					style={styles.image} />
				<TouchableHighlight
					style={[styles.button, styles.buttonProfile]}
					onPress={this.goToProfile.bind(this)}
					underlayColor='#34495e'>
						<Text style={styles.buttonText}>View Profile</Text>
				</TouchableHighlight>
				<TouchableHighlight
					style={[styles.button, styles.buttonRepos]}
					onPress={this.goToRepos.bind(this)}
					underlayColor='#e74c3c'>
						<Text style={styles.buttonText}>View Repos</Text>
				</TouchableHighlight>
				<TouchableHighlight
					style={[styles.button, styles.buttonNotes]}
					onPress={this.goToNotes.bind(this)}
					underlayColor='#f1c40f'>
						<Text style={styles.buttonText}>View Notes</Text>
				</TouchableHighlight>
			</View>
		)
	}
}

module.exports = Dashboard;
