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

import {UIText, UIButton, UIContainer} from '../components/InputComponents';
// import { Toast } from 'native-base';

export default class Home extends Component {
  constructor(props) {
    super(props);

    this.state = {
      fuel_types: [
        'Petrol', 'Diesel', 'CNG'
      ]
    }

  }

  onFuelTypeSelect(index) {
    var selected = this.state.fuel_types[index];
    this.props.navigation.navigate('Step2')
  }

  render() {
    return (
      <UIContainer style={styles.container}>
        <UIText fontSize="28" fontWeight="bold">
          FILLUP.PK
        </UIText>
        <UIText>Welcome!</UIText>
        <View style={{}}>
          {this.state.fuel_types.map((type, ind) => (
            <UIButton key={ind} title={type} onPress={() => this.onFuelTypeSelect(ind)}></UIButton>
          ))}
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
});
