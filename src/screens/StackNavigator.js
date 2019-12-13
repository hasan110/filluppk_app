import React, {Component} from 'react';
import {createStackNavigator, createSwitchNavigator, createAppContainer} from 'react-navigation';

import Login from './Login';
import Signup from './Signup';
import Home from './Home';
import Delivered from './Delivered';
import Start from './Start';
// import Step1 from './steps/Step1';
const AuthScreens = createStackNavigator({
  Start: { screen: Start, navigationOptions: () => ({ header:null })},
  Login: { screen: Login, navigationOptions: () => ({ header:null })},
  Signup: { screen: Signup, navigationOptions: () => ({ header:null })},
});

const AppScreens = createStackNavigator({
  Home: { screen: Home, navigationOptions: () => ({ header:null })},
  // Step1: { screen: Step1, navigationOptions: () => ({ header:null })},
  
});

const AppContainer = createAppContainer(
  createSwitchNavigator({
    Auth: AuthScreens,
    App: AppScreens,
  }, {
    initialRouteName: 'Auth',
  })
);

export default class StackNavigator extends Component {
  render() {
    return <AppContainer />;
  }
}
