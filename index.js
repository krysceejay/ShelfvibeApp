/**
 * @format
 */
//import React, {Component} from 'react';
import {AppRegistry} from 'react-native';
import App from './App';
//import LoadingScene from './src/screens/LoadingScene';
import {name as appName} from './app.json';

// class Main extends Component {
//   constructor(props) {
//     super(props);
//     this.state = {currentScreen: 'Splash'};
//     setTimeout(() => {
//       this.setState({currentScreen: 'Login'});
//     }, 4000);
//   }
//   render() {
//     const {currentScreen} = this.state;
//     let mainScreen = currentScreen === 'Splash' ? <LoadingScene /> : <App />;
//     return mainScreen;
//   }
// }

AppRegistry.registerComponent(appName, () => App);
