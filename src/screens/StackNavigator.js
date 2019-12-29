import React, {Component} from 'react';
import {createStackNavigator, createSwitchNavigator, createAppContainer} from 'react-navigation';
import NavigationService from '../components/NavigationService';

import Login from './Login';
import Signup from './Signup';
import Home from './Home';
import Start from './Start';
import Step1 from './steps/Step1';
import Step2 from './steps/Step2';
import Step3 from './steps/Step3';
import Step4 from './steps/Step4';
import Step5 from './steps/Step5';

const AuthScreens = createStackNavigator({
  Start: { screen: Start, navigationOptions: () => ({ header:null })},
  Login: { screen: Login, navigationOptions: () => ({ header:null })},
  Signup: { screen: Signup, navigationOptions: () => ({ header:null })},
});

const AppScreens = createStackNavigator({
  Home: { screen: Home, },
  Step1: { screen: Step1, },
  Step2: { screen: Step2, },
  Step3: { screen: Step3, },
  Step4: { screen: Step4, },
  Step5: { screen: Step5, },
  
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
    return (<AppContainer 
              ref={navigatorRef => {
                NavigationService.setTopLevelNavigator(navigatorRef);
              }}
            />);
  }
}
