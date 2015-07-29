var React = require('react-native');

var {
	View,
	Text,
	WebView
} = React;

class MyWebView extends React.Component {
	render() {
		return (
			<View style={{ flex: 1, flexDirection: 'column' }}>
				<WebView url={ this.props.url } />
			</View>
		);
	}
}

MyWebView.propTypes = {
	url: React.PropTypes.string.isRequired
};

module.exports = MyWebView;
