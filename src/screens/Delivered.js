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
import RNPickerSelect from 'react-native-picker-select';
import AntDesign from 'react-native-vector-icons/AntDesign';

export default class Delivered extends Component {
  render() {
    const placeholder = {
      label: 'Type of Petrol Delivered',
      value: null,
    };
    return (
      <View style={styles.container}>
        <View
          style={{
            // borderWidth: 1,
            width: '75%',
            alignSelf: 'center',
            marginTop: 30,
            marginBottom: 30,
          }}>
          <Text style={{fontWeight: 'bold', textAlign: 'center', fontSize: 18}}>
            How much petrol do you need delivered and when?
          </Text>
        </View>
        <View style={{}}>
          <View
            style={{
              borderWidth: 2,
              borderColor: '#e20074',
              height: 45,
              borderRadius: 8,
              alignSelf: 'center',
              justifyContent: 'space-around',
              width: '90%',
              backgroundColor: 'white',
              marginTop: 15,
              shadowColor: '#000',
              shadowOffset: {
                width: 0,
                height: 2,
              },
              shadowOpacity: 0.23,
              shadowRadius: 2.62,

              elevation: 4,
            }}>
            <RNPickerSelect
              useNativeAndroidPickerStyle={false}
              placeholder={placeholder}
              placeholderTextColor={'gray'}
              // onValueChange={value => this.handleChange("category", value)}
              onValueChange={value => console.log(value)}
              Icon={() => {
                return (
                  <AntDesign
                    name="caretdown"
                    size={20}
                    style={{marginTop: 2}}
                    color={'#e20074'}
                  />
                );
              }}
              style={styles}
              items={[
                {label: 'High Octan', value: 'High Octan', color: 'black'},
                {label: 'Super', value: 'Super', color: 'black'},
                {
                  label: 'Regular',
                  value: 'Regular',
                  color: 'black',
                },
              ]}
            />
          </View>
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
  inputIOS: {
    fontSize: 18,
    paddingVertical: 12,
    paddingHorizontal: 10,
    color: 'black',
    paddingRight: 30,
  },
  inputAndroid: {
    fontSize: 18,
    height: 55,
    paddingLeft: 15,
    color: 'black',
    alignContent: 'center',
    alignItems: 'center',
  },
  iconContainer: {
    top: 13,
    right: 15,
  },
});
