# react-native-101

Learning React Native in ES6. https://facebook.github.io/react-native/docs/tutorial.html

> I have very little experience with React and zero experience with React Native before start doing this. I knew some basic concepts of components, states, and the `render()` function but never really make any apps with React yet.

The code in tutorial uses both ES5 and ES6 syntax. I change them a bit to use ES6 as much as I can.

## random notes taken

- The official docs uses [io.js](https://iojs.org) but it works with Node also. I was using node to follow the tutorial, no problems found.
- [React Native: Up and Running](https://egghead.io/lessons/react-react-native-up-and-running) free video on egghead.io is a pretty good companion video to the tutorial.
- I'm impressed with toolings React Native provides: Fast to get feedback when updating some code, can use Chrome Devtools to debug. 👍🏼

### Destructuring

- Destructuring(in ES6) is the first thing that ಠ_ಠ me in this code.

So this

```javascript
// ES6
var {
  AppRegistry,
  StyleSheet,
  Text,
  View,
  Image,
  ListView
} = React;
```

is equivalent to:

```javascript
// ES5
var AppRegistry = React.AppRegistry;
var StyleSheet  = React.StyleSheet;
var Text        = React.Text;
var View        = React.View;
var Image       = React.Image;
var ListView    = React.ListView;
```

### Creating a React Component using ES6 Class

in ES5

```javascript
var AwesomeProject = React.createClass({

	getInitialState: function() {
		// return initial state object
		return {};
	},

	render: function() {
		// render the component
	}

});
```

in ES6

```javascript
class AwesomeProject extends React.Component {

	constructor() {
		super();
		this.state = {};
	}

	render() {
		// render the compoenent
	}

}
```

- `React.createClass` is gone. Created class extends `React.Component` instead.
- `getInitialState` method is gone. Initial state object is set in class constructor instead.
- In `constructor` method, `this` cannot be placed before `super()` call.
- From object-literal-style to class-style component, to me it wasn't difficult to wrap my head around the new syntax. It's just the syntax that has been changed slightly, but the concept of the object (or class) is still the same.

### Arrow Functions

(or do they call "fat arrows"?) They are used a lot in the tutorial. It might look just a bit shorter but can becomes pretty neat in Promise chains.

```javascript
// ES5
function() {
	return 'foo';
}

// ES6
() => 'foo'

-----

// ES5
function (response) {
	return response.json();
}

// ES6
(response) => response.json();

-----

// ES5
function (responseData) {
	this.setState({
		movies: responseData.movies
	});
}

// ES6
(responseData) => {
	this.setState({
		movies: responseData.movies
	});
}
```

### `fetch`

- [fetch](https://fetch.spec.whatwg.org/) is the new (and still in-progress) API to get remote resources from a URL with simpler API than XHR. Hopefully it will replace XHR in the future.
- React uses fetch by default.
- `componentDidMount()` method is where we put initial `fetchData()` method call in. `fetchData()` then stores retrieved data in component's state object.

### `render()`

- As far as I understand, `render()` method is called whenver component's `state` is changed.
- So once the component is initialized (in this tutorial), `render()` → `fetchData()` → fetchData got back response data and trigger `state` changes → `render()` is called again.

### Styles

- I'm still not sure if I like putting all styles in `StyleSheet.create` object or not.
- Also the fact that I have to explicitly put inline `style` attribute to almost every UI elements is quite different that what we normally do with CSS.
- A component can accept multiple styles by passing array of styles to it: `style={[styles.base, styles.background]}`
- Since styles in React Native are objects, they can be dynamic and can be passed around.

-----

### `NavigatorIOS`

The code is at: https://github.com/armno/react-native-101/tree/01-routing

- `NavigatorIOS` is a component for creating navigation & routing system.
- It takes `initialRoute` object property to tell what component to use as a default route (first page).
- `Main` component is created in a separated module (CommonJS module) and is imported in main `index.io.js` file (with relative path).
- Data can be passed to `Main` component with `passProps` object. It will become `this.props` in `Main` component.
