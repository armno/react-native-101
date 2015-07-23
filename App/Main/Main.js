'use strict';

var React = require('react-native');

var {
	View,
	Text,
	StyleSheet,
	TextInput,
	TouchableHighlight
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
		console.log('submitted', this.state.username);
	}

	render() {
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
			</View>
		)
	}
}

module.exports = Main;