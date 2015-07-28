/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 */
'use strict';

var React = require('react-native');
var Main = require('./App/Main/Main');

var {
	AppRegistry,
	StyleSheet,
	NavigatorIOS,
} = React;

var styles = StyleSheet.create({
	container: {
		flex: 1,
		backgroundColor: '#111111'
	}
});

class reactNativeOne extends React.Component {

	/**
	 * render the component in ListView
	 */
	render() {
		return (
			<NavigatorIOS
				style={ styles.container }
				initialRoute={{
					title: 'My GitHub',
					component: Main,
					passProps: {
						message: 'Hi I am a message from another component'
					}
				}} />
		);
	}
}

AppRegistry.registerComponent('reactNativeOne', () => reactNativeOne);
