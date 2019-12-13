import React, {Component} from 'react';
import {
  Platform,
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
  ImageBackground,
  Image,
  TextInput,
} from 'react-native';

export default class Home extends Component {
  render() {
    console.log('start props nav', this.props.navigation);

    return (
      <View style={styles.container}>
        <View
          style={{
            height: '28%',
            alignItems: 'center',
            justifyContent: 'flex-end',
            // borderWidth: 1,
          }}>
          <Text style={{fontSize: 24, fontWeight: 'bold', marginBottom: 20}}>
            Welcome to FillUP.pk
          </Text>
          <Text style={{fontSize: 24, fontWeight: 'bold'}}>
            Sign in or CheckOut
          </Text>
          <Text style={{fontSize: 24, fontWeight: 'bold'}}>as a Guest!</Text>
        </View>
        <View style={{width: '100%', height: '72%', justifyContent: 'center'}}>
          <TouchableOpacity
            style={[styles.btn, {marginTop: -40}]}
            onPress={() => this.props.navigation.navigate('Signup')}>
            <Text style={styles.btnTxt}>Sign Up</Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={styles.btn}
            onPress={() => this.props.navigation.navigate('Login')}>
            <Text style={styles.btnTxt}>Login</Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={styles.btn}
            onPress={() => this.props.navigation.navigate('Home')}>
            <Text style={styles.btnTxt}>Order as guest</Text>
          </TouchableOpacity>
        </View>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,

    backgroundColor: '#ffffff',
  },
  btn: {
    height: 40,
    width: '60%',
    alignSelf: 'center',
    marginTop: 20,
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 10,
    backgroundColor: '#fdbb56',
  },
  btnTxt: {
    color: 'white',
    fontSize: 18,
  },
});
