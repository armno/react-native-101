var React = require('react-native');
var Seperator = require('../Separator/Separator');
var MyWebView = require('../MyWebView/MyWebView');

var {
	View,
	ScrollView,
	Text,
	StyleSheet,
	TouchableHighlight
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

	goToRepo(url) {
		console.log('going to: ', url);
		this.props.navigator.push({
			component: MyWebView,
			title: 'Repo Homepage',
			passProps: {
				url: url
			}
		});
	}

	render() {
		var list = this.props.repos.map((item, index) => {
			return (
				<View key={ index }>
					<TouchableHighlight style={ styles.rowContainer }
						onPress={ this.goToRepo.bind(this, item.html_url) }
						underlayColor="transparent">
						<Text style={ styles.rowContent }>{ item.name }</Text>
					</TouchableHighlight>
					<Seperator />
				</View>
			);
		});

		return (
			<ScrollView style={ styles.container }>
				{ list }
			</ScrollView>
		);
	}
}

module.exports = Repositories;
