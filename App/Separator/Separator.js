var React = require('react-native');

var {
	View,
	StyleSheet
} = React;

var styles = StyleSheet.create({
	separator: {
		height: 1,
		backgroundColor: '#ecf0f1',
		flex: 1
	}
});

class Separator extends React.Component {
	render() {
		return (
			<View style={ styles.separator } />
		);
	}
}

module.exports = Separator;
