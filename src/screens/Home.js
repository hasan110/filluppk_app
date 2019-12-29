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
  PermissionsAndroid
} from 'react-native';

import {UIText, UIImage, UIButton, UIContainer, UILoader, UIHeaderOptions} from '../components/InputComponents';
import Storage from '../components/Storage';
import Geolocation from 'react-native-geolocation-service';

export default class Home extends Component {
    static navigationOptions = UIHeaderOptions();

    constructor(props) {
        super(props);
        this.state = {
          user: {id: 0, name: 'Guest'},
          location: {},
          locationError: true,
        }

        Storage.get('@user').then(u => u && this.setState({user: u}));
        
    }

    componentDidMount() {
      this.checkLocationPermission();
    }

    onOrderButtonClick = () => {
      if(!this.state.locationError)
        this.props.navigation.navigate('Step2', {user: this.state.user});
      else {
        this.requestLocationPermission();
      }
    }

    async checkLocationPermission() {
      await PermissionsAndroid.check(PermissionsAndroid.PERMISSIONS.ACCESS_FINE_LOCATION)
                              .then(check => this.setState({locationError: !check}));
    }
    async requestLocationPermission() {
      const granted = await PermissionsAndroid.request(
        PermissionsAndroid.PERMISSIONS.ACCESS_FINE_LOCATION,
        {
          title: 'We need Location permission',
          message: '',
          buttonNegative: 'Cancel',
          buttonPositive: 'Permit',
        }
      );
      if(granted == PermissionsAndroid.RESULTS.GRANTED) {
        Geolocation.getCurrentPosition(
              (info) => {
                  this.setState({locationError: false, location: info.coords});
                  Storage.set('@location', info.coords);
              },
              (error) => {
                  console.log(error.code, error.message);
              },
              { enableHighAccuracy: true, timeout: 15000, maximumAge: 10000 }
          );
      } else {
        alert('Permission not granted!');
      }
    }

    render() {
        return (
            <UIContainer>
              <View style={{position: 'relative', maxHeight: 350}}>
                <Image
                    style={{maxWidth: 290, maxHeight: 290}}
                    source={require('../../assets/images/empty-gas-automobile-vehicle-car-panel-automotive-512.png')} 
                    resizeMode="contain" />
                <Image
                    style={{position: 'absolute', bottom: -100, left: 100, maxWidth: 110}}
                    source={require('../../assets/images/local_gas_station.png')}
                    resizeMode="contain" />
              </View>
              <View style={{marginTop: 50, height: 100}}>
                <UIText fontWeight="bold" fontColor="black" fontSize="26" textAlign="center">
                  Never Worry About Empty 
                </UIText>
                <UIText textAlign="center" textStyles={{maxWidth: 300}}>
                  Connect with your closest fuel provider anywhere in Pakistan
                </UIText>
              </View>
              <View style={{flexDirection: "row", width: '100%', marginTop: 10,
                          alignContent: "center",
                          justifyContent: 'space-around'}}>
                <Image
                      style={{maxWidth: 60, maxHeight: 60}}
                      source={require('../../assets/images/shell.png')} 
                      resizeMode="contain" />
                <Image
                      style={{maxWidth: 70, maxHeight: 70}}
                      source={require('../../assets/images/total.png')} 
                      resizeMode="contain" />
                <Image
                      style={{maxWidth: 60, maxHeight: 60}}
                      source={require('../../assets/images/pso.png')} 
                      resizeMode="contain" />
              </View>
              <UIButton title={this.state.locationError ? "Grant Location Access" : "Click to continue"} onPress={() => this.onOrderButtonClick()}></UIButton>
              <View style={{marginTop: 20}}></View>
            </UIContainer>
        );
    }
}
