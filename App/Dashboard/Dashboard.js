var React = require('react-native');
var Profile = require('../Profile/Profile');
var Api = require('../Utilities/Api');
var Repositories = require('../Repositories/Repositories');
var Notes = require('../Notes/Notes');

var {
	Text,
	View,
	StyleSheet,
	Image,
	TouchableHighlight,
	ActivityIndicatorIOS
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
	},
	loading: {
		alignSelf: 'center',
		position: 'absolute',
		top: 50,
		left: 50,
		backgroundColor: 'transparent'
	}
});

class Dashboard extends React.Component {

	constructor() {
		super();

		this.state = {
			isLoading: false
		};
	}

	goToProfile() {
		this.props.navigator.push({
			title: 'Profile Page',
			component: Profile,
			passProps: {
				userInfo: this.props.userInfo
			}
		})
	}

	goToRepos() {

		this.setState({
			isLoading: true
		});

		Api.getRepos(this.props.userInfo.login)
			.then((repos) => {
				this.props.navigator.push({
					component: Repositories,
					title: 'Repositories',
					passProps: {
						repos: repos
					}
				});

				this.setState({
					isLoading: false
				});
			});
	}

	goToNotes() {
		this.setState({
			isLoading: true
		});

		Api.getNotes(this.props.userInfo.login)
			.then((notes) => {
				notes = notes || {};
				this.props.navigator.push({
					component: Notes,
					title: 'Notes',
					passProps: {
						userInfo: this.props.userInfo,
						notes
					}
				});

				this.setState({
					isLoading: false
				});
			});
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
				<ActivityIndicatorIOS
					style={ styles.loading }
					animating={ this.state.isLoading }
					hide={ !this.state.isLoading }
					color="#111"
					size="small">
				</ActivityIndicatorIOS>
			</View>
		)
	}
}

module.exports = Dashboard;
