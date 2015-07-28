var React = require('react-native');
var Badge = require('../Badge/Badge');
var Seperator = require('../Separator/Separator');

var {
	View,
	Text,
	StyleSheet,
	ScrollView
} = React;

var styles = StyleSheet.create({
	container: {
		flex: 1
	},
	rowContainer: {
		padding: 10
	},
	rowTitle: {
		fontSize: 14,
		fontWeight: 'bold',
		color: '#bdc3c7'
	},
	rowContent: {
		fontSize: 20,
		color: '#34495e'
	}
});

class Profile extends React.Component {

	render() {
		var fields = ['company', 'location', 'followers', 'following', 'email', 'bio', 'public_repos', 'blog'];

		var list = fields.map((item, index) => {
			if ( !this.props.userInfo[item] ) {
				return <View key={ index } />
			}

			return (
				<View key={ index }>
					<View style={ styles.rowContainer }>
						<Text style={ styles.rowTitle }>{ item.toUpperCase() }</Text>
						<Text style={ styles.rowContent }>{ this.props.userInfo[item] }</Text>
					</View>
					<Seperator />
				</View>
			);
		}, this);

		return (
			<ScrollView style={ styles.container }>
				<Badge userInfo={ this.props.userInfo }></Badge>
				{ list }
			</ScrollView>
		)
	}
}

Profile.propTypes = {
	userInfo: React.PropTypes.object.isRequired
};

module.exports = Profile;
