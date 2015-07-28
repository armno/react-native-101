'use strict';

var React = require('react-native');
var Dashboard = require('../Dashboard/Dashboard');
var Badge = require('../Badge/Badge');
var Api = require('../Utilities/Api');

var {
	View,
	Text,
	StyleSheet,
	TextInput,
	TouchableHighlight,
	ActivityIndicatorIOS
} = React;

var styles = StyleSheet.create({
	container: {
		flex: 1,
		padding: 30,
		flexDirection: 'column',
		justifyContent: 'center',
		alignItems: 'center',
		backgroundColor: '#fff',
	},
	text: {
		color: '#333'
	},
	searchInput: {
		height: 50,
		padding: 8,
		margin: 30,
		fontSize: 23,
		borderWidth: 1,
		borderColor: '#95a5a6',
		color: '#333'
	},
	buttonText: {
		fontSize: 18,
		color: 'white',
		alignSelf: 'center',
		backgroundColor: '#1abc9c',
		paddingTop: 15,
		paddingBottom: 15,
		paddingLeft: 30,
		paddingRight: 30,
		fontWeight: 'bold'
	}
});

class Main extends React.Component {

	constructor(props) {
		super(props);
		this.state = {
			username: '',
			isLoading: false,
			error: false
		};
	}

	handleChange(event) {
		this.setState({
			username: event.nativeEvent.text
		});
	}

	handleSubmit(event) {
		this.setState({
			isLoading: true
		});

		let username = this.state.username.trim();
		Api.getUser(username)
			.then((res) => {

				if (res.message === 'Not Found') {
					this.setState({
						error: 'User not found',
						isLoading: false
					});
				} else {
					this.props.navigator.push({
						title: res.name || 'Select an Option',
						component: Dashboard,
						passProps: {
							userInfo: res
						}
					});

					// restore the default states
					this.setState({
						isLoading: false,
						error: false,
						username: ''
					})
				}
			});
	}

	render() {

		var showError = (
			this.state.error ? <Text>{this.state.error}</Text> : <View></View>
		);

		return (
			<View style={ styles.container }>
				<Text style={ styles.text }>Search for a GitHub user</Text>
				<TextInput
					style={styles.searchInput}
					value={this.state.username}
					onChange={this.handleChange.bind(this)} />
				<TouchableHighlight
					style={styles.button}
					onPress={this.handleSubmit.bind(this)}
					underlayColor="white">
						<Text style={styles.buttonText}>SEARCH</Text>
				</TouchableHighlight>
				<ActivityIndicatorIOS
					animating={ this.state.isLoading }
					color="#111"
					size="small">
				</ActivityIndicatorIOS>
				{ showError }
			</View>
		)
	}
}

module.exports = Main;
