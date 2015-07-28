var React = require('react-native');
var Badge = require('../Badge/Badge');

var {
	View,
	Text,
	StyleSheet,
} = React;

var styles = StyleSheet.create({
	container: {
		backgroundColor: 'white',
		marginTop: 65,
		flex: 1
	}
});

class Profile extends React.Component {
	render() {
		return (
			<View style={ styles.container }>
				<Badge userInfo={ this.props.userInfo }></Badge>
			</View>
		)
	}
}

module.exports = Profile;
