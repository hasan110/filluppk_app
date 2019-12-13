import React, {Component} from 'react';
import {
  Platform,
  SafeAreaView,
  ScrollView,
  StyleSheet,
  Text,
  View,
  Image,
} from 'react-native';

import {InputText, UIButton, UIText} from '../components/InputComponents';

export default class Signup extends Component {
  constructor(props) {
    super(props);
    this.state = {
      name: '',
      email: '',
      phone: '',
      password: '',
      hidden: true,
    };
  }

  onButtonPress() {
    
  }

  render() {
    console.log('signup props nav', this.props.navigation)
    return (
      <SafeAreaView style={styles.container}>
        <ScrollView>
          <View>
            <View style={styles.imageView}>
              <Image
                source={require('../../assets/icons/logo2.png')}
                style={{width: 180, height: 100}}
                resizeMode={'contain'}
              />
              <Text style={styles.Heading}>Sign Up</Text>
            </View>

            <InputText 
                type="text"
                title="Full Name" 
                placeholder="Please enter your name" 
                onChange={name => this.setState({name})} 
                />
            
            <InputText 
                type="email"
                title="E-Mail Address" 
                placeholder="Enter your email address" 
                onChange={email => this.setState({email})} 
                />
            <InputText 
                type="phone"
                title="Phone Number" 
                placeholder="Enter your phone number" 
                onChange={phone => this.setState({phone})} 
                />

            <InputText 
                type="password"
                title="Password" 
                placeholder="Please enter your password" 
                onChange={password => this.setState({password})} 
                />

            <UIButton title="Sign Up" onPress={this.onButtonPress}></UIButton>
            
            <View
                style={{
                  flexDirection: 'row',
                  borderWidth: 0,
                  justifyContent: 'center',
                }}>
                <UIText>Already a user? </UIText>
                <UIText 
                  onPress={() => this.props.navigation.push('Login')}
                  >Sign In</UIText>
            </View>
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