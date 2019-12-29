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

import {InputText, UIButton, UIText, UIContainer, Constants} from '../components/InputComponents';

import { AuthApi } from '../datastore/ApiData';
import Storage from '../components/Storage';

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
      alert('Please enter valid email');
    } else if (password == '') {
      alert('Please enter your password');
    } else {
      AuthApi('login', {
        email: email, password: password
      }).then(d => {
        if(d) {
          if(!d.error) {
            var storeData = {id: d.id, name: d.name, email: d.email, phone: d.phone};
            Storage.set('@user', storeData).then(d => {
              this.props.navigation.navigate('App');
            });
          } else {
            alert(d.error)
          }
        } 
      });
    }

  };

  navigateTo(routeName) {
    this.props.navigation.navigate(routeName);

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
              <UIText fontSize="32" textAlign="center">LogIn</UIText>
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
