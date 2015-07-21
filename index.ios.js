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
} = React;

var MOCKED_MOVIES_DATA = [
  {
    title: 'Title',
    year: '2015',
    posters: {
      thumbnail: 'http://i.imgur.com/UePbdph.jpg'
    }
  }
];

var REQUEST_URL = 'https://raw.githubusercontent.com/facebook/react-native/master/docs/MoviesExample.json';

class reactNativeOne extends React.Component {

  constructor() {
    super();
    this.state = {
      movies: null
    };
  }

  componentDidMount() {
    this.fetchData();
  }

  fetchData() {
    fetch(REQUEST_URL)
      .then((response) => response.json())
      .then((responseData) => {
        this.setState({
          movies: responseData.movies
        });
      })
      .done();
  }

  renderLoadingView() {
    return (
      <View style={ styles.container }>
        <Text>
          Loading movies ...
        </Text>
      </View>
    );
  }

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

  render() {

    if ( !this.state.movies ) {
      return this.renderLoadingView();
    }

    let movie = this.state.movies[0];
    return this.renderMovie(movie);

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
  }
});

AppRegistry.registerComponent('reactNativeOne', () => reactNativeOne);
