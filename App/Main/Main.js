'use strict';

var React = require('react-native');

var {
	View,
	Text,
	StyleSheet
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
	}
});

class Main extends React.Component {
	render() {
		return (
			<View style={ styles.container }>
				<Text style={ styles.text }>{ this.props.message }</Text>
			</View>
		)
	}
}

module.exports = Main;
