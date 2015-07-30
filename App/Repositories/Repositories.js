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

class Repositories extends React.Component {

	goToRepo(url) {
		this.props.navigator.push({
			component: MyWebView,
			title: 'On GitHub',
			passProps: {
				url: url
			}
		});
	}

	render() {
		let list = this.props.repos.map((item, index) => {
			let language = (item.language) ? item.language.toUpperCase() : '';
			return (
				<View key={ index } style={ styles.container }>
					<View style={ styles.rowContainer }>
						<Text style={ styles.rowTitle }>{ language }</Text>
						<TouchableHighlight
							onPress={ this.goToRepo.bind(this, item.html_url) }
							underlayColor="transparent">
							<Text style={ styles.rowContent }>{ item.name }</Text>
						</TouchableHighlight>
					</View>
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
