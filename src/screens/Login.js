import React, {Component} from 'react';
import {
  SafeAreaView,
  ScrollView,
  Platform,
  StyleSheet,
  Text,
  View,
  Image,
} from 'react-native';

import {NavigationActions} from 'react-navigation';

import {InputText, UIButton, UIText} from '../components/InputComponents';

import {Content} from 'native-base';

import {CheckUser} from '../components/ApiData';

export default class Login extends Component {
  constructor(props) {
    super(props);
    this.state = {
      hidden: true,
      email: '',
      password: '',
    };

  }

  myfun = () => {
    const {email, password} = this.state;
    var test = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/.test(email);
    if (test == false) {
      alert('please enter valid email');
    } else if (password == '') {
      alert('please enter password');
    } else {
      var user = CheckUser({ email: email, password: password });
      if(user.error) {
        alert(user.error);
      }
    }
    this.props.navigation.navigate('Delivered');
  };

  navigateTo(routeName) {
    var navigate = this.props.navigation.navigate(routeName);
    console.log(navigate)
  }
  render() {
    console.log('login props nav', this.props.navigation);
    return (
      <SafeAreaView style={styles.container}>
        <ScrollView>
            <View style={styles.imageView}>
              <Image
                source={require('../../assets/icons/logo2.png')}
                style={{width: 180, height: 100}}
                resizeMode={'contain'}
              />
              <Text style={styles.Heading}>LogIn</Text>
            </View>

            <InputText 
                type="email"
                title="E-Mail Address" 
                placeholder="Enter your email address" 
                onChange={email => this.setState({email})} 
                />

            <InputText 
                type="password"
                title="Password" 
                placeholder="Please enter your password" 
                onChange={password => this.setState({password})} 
                />

            <UIButton title="Login" onPress={this.myfun}></UIButton>
            
            <View
                style={{
                  flexDirection: 'row',
                  borderWidth: 0,
                  justifyContent: 'center',
                }}>
                <UIText>Not a user? </UIText>
                <UIText 
                  onPress={() => this.navigateTo('Signup')}
                  >Sign Up</UIText>
            </View>
        </ScrollView>
      </SafeAreaView>
      );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f9f9f9',
  },
  imageView: {
    height: 160,
    flexDirection: 'column',
    alignItems: 'center',
    width: '100%'
  },
  Heading: {
    color: '#fdbb56',
    fontWeight: 'bold',
    fontSize: 30,
  },
  mainSec: {
    width: '90%',
    alignSelf: 'center',
    marginTop: 10,
  },
});
