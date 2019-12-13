import React, {Component} from 'react';
import {Platform, StyleSheet, Text, View} from 'react-native';
// import DashboardHome from './src/Screens/DashboardHome';

import StackNavigator from './src/screens/StackNavigator';

export default class App extends Component {
  constructor(props) {
    super(props);
    this.state = {};
  }

  render() {
    return <StackNavigator />;
  }
}

// const styles = StyleSheet.create({
//   container: {
//     flex: 1,
//     backgroundColor: "#F5FCFF"
//   }
// });
