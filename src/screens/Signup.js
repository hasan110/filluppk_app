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
import Storage from '../components/Storage';

import {InputText, UIButton, UIText, UIContainer, Constants} from '../components/InputComponents';
import { AuthApi } from '../datastore/ApiData';

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

  onButtonPress = () => {
    const {name, email, phone, password} = this.state;
    var test = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/.test(email);
    if (test == false) {
      alert('Please enter valid email');
    } else if (name == '' || password == '' || email == '') {
      alert('Please fill in all the required fields');
    } else {
      console.log({
       name: name, email: email, phone: phone, password: password
      })
      AuthApi('signup', {
       name: name, email: email, phone: phone, password: password
      }).then(d => {
        if(d) {
          if(!d.error) {
            var storeData = {id: d.id, name: d.name, email: d.email, phone: d.phone};
            Storage.set('@user', storeData).then(d => {
              this.props.navigation.navigate('App');
            });
          } else {
            alert(d.error);
            console.log('user_error', d.error);
          }
        } 
      });
    }
  }

  render() {
    return (
      <UIContainer>
            <View style={styles.imageView}>
              {/*<Image
                source={require('../../assets/icons/logo2.png')}
                style={{width: 180, height: 100}}
                resizeMode={'contain'}
              />*/}
              <UIText fontWeight="bold" fontSize="32" textAlign="center" textStyles={styles.Heading}>FILLUP.PK</UIText>
              <UIText fontSize="32" textAlign="center">Sign Up</UIText>
            </View>

            <InputText 
                type="text"
                title="Full Name *" 
                placeholder="Please enter your name" 
                onChange={name => this.setState({name})} 
                />
            
            <InputText 
                type="email"
                title="E-Mail Address *" 
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
                title="Password *" 
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
                  onPress={() => this.props.navigation.navigate('Login')}
                  >Sign In</UIText>
            </View>
          </UIContainer>
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
    color: Constants.PRIMARY_COLOR,
    fontWeight: 'bold',
    fontSize: 30,
  },
  mainSec: {
    width: '90%',
    alignSelf: 'center',
    marginTop: 10,
  },
});