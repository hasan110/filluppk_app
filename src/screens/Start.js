import React, {Component} from 'react';
import {
  Platform,
  StyleSheet,
  View,
  TouchableOpacity,
  ImageBackground,
  Image,
} from 'react-native';

import {UIButton, UILoader, UIText} from '../components/InputComponents';
import Storage from '../components/Storage';


export default class Home extends Component {
  constructor(props) {
    super(props);
    this.state = {
      loggedIn: false,
      user: {},
      isLoaded: false,
    }
    Storage.get('@user').then((user) => {
      if(user && user.id) {
        this.props.navigation.navigate('App');
      } else this.setState({isLoaded: true});
    });
  }
  
  componentDidMount() {
    
  }

  onGuestClick = () => {
    var guest = {id: 0, name: 'Guest'};
    Storage.set('@user', guest).then((d) => {
      this.props.navigation.navigate('App');
    });
  }

  render() {
    var content = this.state.isLoaded ? (
      <View style={styles.container}>
        <View
          style={{
            height: '28%',
            alignItems: 'center',
            justifyContent: 'flex-start',
            marginTop: 20
          }}>
          
          <Image
              style={{maxWidth: 250, maxHeight: 250}}
              source={require('../../assets/images/empty-gas-automobile-vehicle-car-panel-automotive-512.png')} 
              resizeMode="contain" />

          <UIText fontSize="20" fontWeight="normal" textAlign="center">Signin or Order</UIText>
          <UIText fontSize="20" fontWeight="normal" textAlign="center">as a guest</UIText>
        </View>
        <View style={{width: '90%', height: '100%', justifyContent: 'center', alignSelf:'center'}}>
          <UIButton 
            title="Sign Up"
            onPress={() => this.props.navigation.navigate('Signup')}></UIButton>

          <UIButton 
            title="Login"
            onPress={() => this.props.navigation.navigate('Login')}></UIButton>

          <UIButton 
            title="Continue as a guest"
            onPress={this.onGuestClick}></UIButton>
        </View>
      </View>
    ) : <UILoader />;

    return content;
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
