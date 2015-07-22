/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 */
'use strict';

var React = require('react-native');
var {
	AppRegistry,
	StyleSheet,
	Text,
	View,
	Image,
	ListView
} = React;

var REQUEST_URL = 'https://raw.githubusercontent.com/facebook/react-native/master/docs/MoviesExample.json';

class reactNativeOne extends React.Component {

	/**
	 * initialize states. (`getInitialState` equivalent?)
	 *
	 * create `this.state.dataSource` to hold api response data in a ListView object
	 */
	constructor(props) {
		super(props);
		this.state = {
			loaded: false,
			dataSource: new ListView.DataSource({
				rowHasChanged: (row1, row2) => row1 !== row2
			})
		};
	}

	/**
	 * get data from api once the component has been loaded
	 */
	componentDidMount() {
		this.fetchData();
	}

	/**
	 * get data from api server and store it in `this.state.dataSource`
	 * also set `loaded` flag to be TRUE so we can test in `render()` method
	 * if the component has already got the data
	 */
	fetchData() {
		fetch(REQUEST_URL)
			.then((response) => response.json())
			.then((responseData) => {
				this.setState({
					loaded: true,
					dataSource: this.state.dataSource.cloneWithRows(responseData.movies)
				});
			})
			.done();
	}

	/**
	 * render loading view (shown before the component got data from api server)
	 */
	renderLoadingView() {
		return (
			<View style={ styles.container }>
				<Text>
					Loading movies ...
				</Text>
			</View>
		);
	}

	/**
	 * render a single view of movie element
	 * @param  {object} movie
	 */
	renderMovie(movie) {
		return (
			<View style={ styles.container }>
				<Image source={{ uri: movie.posters.thumbnail }}
					style={ styles.thumbnail } />

				<View style={ styles.rightContainer }>
					<Text style={ styles.title }>{ movie.title }</Text>
					<Text style={ styles.year }>{ movie.year }</Text>
				</View>
			</View>
		);
	}

	/**
	 * render the component in ListView
	 */
	render() {

		if ( !this.state.loaded ) {
			return this.renderLoadingView();
		}

		return (
			<ListView
				dataSource={ this.state.dataSource }
				renderRow={ this.renderMovie }
				style={ styles.listView }
			/>
		);

	}

}

var styles = StyleSheet.create({
	container: {
		flex: 1,
		flexDirection: 'row',
		justifyContent: 'center',
		alignItems: 'center',
		backgroundColor: '#F5FCFF',
	},
	thumbnail: {
		width: 53,
		height: 81
	},
	rightContainer: {
		flex: 1,
	},
	title: {
		fontSize: 20,
		marginBottom: 8,
		textAlign: 'center'
	},
	year: {
		textAlign: 'center'
	},
	listView: {
		paddingTop: 20,
		backgroundColor: '#f5fcff'
	}
});

AppRegistry.registerComponent('reactNativeOne', () => reactNativeOne);
