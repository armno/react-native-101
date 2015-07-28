var React = require('react-native');
var Seperator = require('../Separator/Separator');

var {
	View,
	ScrollView,
	Text,
	StyleSheet
} = React;

var styles = StyleSheet.create({
	container: {
		flex: 1
	},
	rowContainer: {
		padding: 10
	},
	rowContent: {
		fontSize: 20,
		color: '#34495e'
	}
});

class Repositories extends React.Component {
	render() {
		var list = this.props.repos.map((item, index) => {
			return (
				<View key={ index }>
					<View style={ styles.rowContainer }>
						<Text style={ styles.rowContent }>{ item.name }</Text>
					</View>
					<Seperator />
				</View>
			)
		})
		return (
			<ScrollView style={ styles.container }>
				{ list }
			</ScrollView>
		);
	}
}

module.exports = Repositories;
