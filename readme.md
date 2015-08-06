# react-native-101

Learning React Native in ES6. https://facebook.github.io/react-native/docs/tutorial.html and the course [React Native Fundamentals](https://egghead.io/series/react-native-fundamentals) on egghead.io.

> I have very little experience with React and zero experience with React Native before start doing this. I knew some basic concepts of components, states, and the `render()` function but never really make any apps with React yet.

The code in tutorial uses both ES5 and ES6 syntax. I change them a bit to use ES6 as much as I can.

## Running this app on simulartor

```sh
$ npm install
$ open reactNativeOne.xcodeproj
```

## Running on device

run

```sh
$ react-native bundle
```

Then open `AppDelegate.m` in Xcode, comment this line (~L34)

```
jsCodeLocation = [NSURL URLWithString:@"http://localhost:8081/index.ios.bundle"];
```

and uncomment this line (~L46)

```
jsCodeLocation = [[NSBundle mainBundle] URLForResource:@"main" withExtension:@"jsbundle"];
```

Then run on the device connected

-----

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
- `.then((res) => res.json())` to get actual response data in JSON format (first thing to do, maybe?)
- `fetch` also supports other type of HTTP requests that `GET`. For example, `.fetch(url, { method: 'POST' })`

### `render()`

- As far as I understand, `render()` method is called whenver component's `state` is changed.
- So once the component is initialized (in this tutorial), `render()` → `fetchData()` → fetchData got back response data and trigger `state` changes → `render()` is called again.

### Styles

- I'm still not sure if I like putting all styles in `StyleSheet.create` object or not.
- Also the fact that I have to explicitly put inline `style` attribute to almost every UI elements is quite different that what we normally do with CSS.
- A component can accept multiple styles by passing array of styles to it: `style={[styles.base, styles.background]}`
- Since styles in React Native are objects, they can be dynamic and can be passed around.
- We can't put `textTransform: 'uppercase'` in styles object. See [react-native/2088](https://github.com/facebook/react-native/issues/2088)

-----

### `NavigatorIOS`

- `NavigatorIOS` is a component for creating navigation & routing system.
- It takes `initialRoute` object property to tell what component to use as a default route (first page).
- `Main` component is created in a separated module (CommonJS module) and is imported in main `index.io.js` file (with relative path).
- Data can be passed to `Main` component with `passProps` object. It will become `this.props` in `Main` component.

### Input fields

- `TextInput` = input field. `TouchableHighlight` = button
- `TouchableHighlight` uses `onPress`.
- `underlayColor` property of `TouchableHighlight` = the color when press on the button.

### ActivityIndicatorIOS (loading spinner)

- We can use component's state variable to control on when to display the loading spinner `animating={ this.state.isLoading }`.

-----

### Navigating between pages

- After creating few components (and some nested components), it's becoming more clear to me to think about things as components.
- I usually forget `module.exports` in component file.

- To me, `<NavigatorIOS>` is like a root-level `<ui-view>` in angular-ui-router world.
- To go to another state:

```javascript
this.props.navigator.push({
	title: 'Title of the next view',
	component: Profile // main component of the next view
	passProps: {} // properties to pass to the next view
})
```

- This means we have to create `Profile` component and import into this main component first. (of course!)
- `passProps` is an object with data that we want to pass to `Profile` component. This object will become `this.props` in `Profile` component automatically.
- Unlike using `navigator`, we pass data object to a sub-component using properties. See https://github.com/armno/react-native-101/blob/master/App/Profile/Profile.js#L22.

#### `propTypes`

- `propTypes` object is for defining what are the component's properies (attributes?), This is a [React thing](https://facebook.github.io/react/docs/reusable-components.html). Basically to make sure this component will be used correctly: correct types and meet defined validations.
- `Badge` component is created at https://github.com/armno/react-native-101/blob/master/App/Badge/Badge.js.
- `React.PropTypes.object.isRequired` = the prop should be an object and it is required.
- Putting `propTypes` definition as class properties (in `constructor()`) seems to work too. **BUT that's not what we want to do**.

### Aside: ES6 Class properties

- I was wondering if I could put `propTypes` definition in the class itself.
- It should be as easy as:

```javascript
class Nay extends Nom {
	// property
	this.name = 'Yay';

	// method
	render() {

	}
}

// or
class Nay extends Nom {
	constructor() {
		this.name = 'Yay';
	}
}
```

- **No.**
- See: http://wiki.ecmascript.org/doku.php?id=strawman:maximally_minimal_classes

> Class declarations/expressions create a constructor function/prototype pair exactly as for function declarations.

- ES6 Classes don't create actual classes: they create prototype chains for you. (Remember what people say about sugar syntax?)
- So what should be in a class definition are **only prototype methods**, as far as I understand.
- (From the same URL above)

> Class properties and prototype data properties need be created outside the declaration.

- So really the correct way to define `propTypes` is outside the `Nay` class definition.

```javascript
class Nay extends Nom {

}

Nay.name = 'Yay';
```

- It's the same reason why we don't want to set a variable to a function's (class') prototype.
- This is my _very-aha_ moment.
- (Maybe we will [see it in ES7](https://esdiscuss.org/topic/es7-property-initializers) though)

-----

### `WebView`

- `WebView` actually has [a bunch of properties](https://facebook.github.io/react-native/docs/webview.html#content). But only `url` is really required to get it up on the screen.
