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

import {UIText, UIButton, UIContainer, UILoader, UIHeaderOptions} from '../../components/InputComponents';
import Storage from '../../components/Storage';
import { GetFuelTypes } from '../../datastore/ApiData';

export default class Step1 extends Component {
  static navigationOptions = UIHeaderOptions();
  constructor(props) {
    super(props);
    this.state = {
      user: props.navigation.getParam('user'),
      fuel_types: [
        {id: 1, name: 'Petrol', is_available: 1},
        {id: 2, name: 'Diesel', is_available: 1},
        {id: 3, name: 'CNG', is_available: 0},
      ],
      isLoaded: false
    };

  }

  componentDidMount() {
    GetFuelTypes().then(response => {
      if(response && response.data) {
        this.setState({fuel_types: response['data'], isLoaded: true});
      }
    });
  }

  onFuelTypeSelect = (index) => {
    var selected = this.state.fuel_types[index];
    if(selected.is_available) {
      this.props.navigation.navigate('Step2', {
          selectedFuelType: selected,
          user: this.state.user
      });
    } else {
      alert("This feature is not available yet.");
    }

  }

  render() {
    var content =  this.state.isLoaded ? (
          <UIContainer>
            <UIText textAlign="center" fontSize="22">
              What would you like delivered
            </UIText>
            <UIText textAlign="center" fontSize="22">
             today?
            </UIText>
            <View style={{marginTop: 20, width: '90%', marginTop: 50}}>
                {this.state.fuel_types.map((type, ind) => (
                  <UIButton key={ind} title={type.name} 
                      subtitle={type.is_available?null:"Comming soon"} 
                      onPress={() => this.onFuelTypeSelect(ind)}></UIButton>
                ))}
            </View>
          </UIContainer>
            ) : (
              <UILoader />
            );
      return content;
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,

    backgroundColor: '#f9f9f9',
  },
});
