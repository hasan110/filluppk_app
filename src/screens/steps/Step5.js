import React, {Component} from 'react';
import {
  Platform,
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
  ImageBackground,
  Image,
  Picker,
} from 'react-native';

import {UIText, UIButton, UIContainer, InputText, UIHeaderOptions} from '../../components/InputComponents';
import { GetFuelTypes, GetData } from '../../datastore/ApiData';

export default class Step5 extends Component {
  static navigationOptions = {...UIHeaderOptions(), headerLeft: null};
  constructor(props) {
    super(props);
    this.state = {
      amount: props.navigation.getParam('amount'),
      orderDetails: props.navigation.getParam('orderDetail'),
      payment: props.navigation.getParam('payment'),
      deliveryTime: props.navigation.getParam('delivery_time'),
      
    };

  }

  componentDidMount() {

  }

  onCompanySelect = (index) => {
    var selected = this.state.companies[index];
    this.props.navigation.navigate('Step3', {
        selectedCompany: selected
    });

  }

  orderContinue = () => {
    var selected = this.state.companies[this.state.seletedStationIndex];
    this.props.navigation.navigate('Step3', {
        selectedStation: selected
    })
  };

  render() {
    return (
      <UIContainer style={styles.container}>
        <UIText fontSize="28" fontWeight="bold"  textAlign="center">
          FILLUP.PK
        </UIText>
        <UIText textAlign="center">Your order is confired</UIText>
        <View style={{flexDirection: 'row', marginTop: 30, alignContent: 'stretch'}}>
          <UIText fontSize="16" styles={{width: '45%', alignItems: 'flex-end'}}>Name : </UIText>
          <UIText fontSize="16" fontWeight="bold" styles={{width: '50%', alignItems: 'flex-start'}}>{this.state.orderDetails.name}</UIText>
        </View>
        <View style={{flexDirection: 'row', marginTop: 30, alignContent: 'stretch'}}>
          <UIText fontSize="16" styles={{width: '45%', alignItems: 'flex-end'}}>Phone : </UIText>
          <UIText fontSize="16" fontWeight="bold" styles={{width: '50%', alignItems: 'flex-start'}}>{this.state.orderDetails.phone}</UIText>
        </View>
        {
          this.state.orderDetails.backup_phone ? (
            <View style={{flexDirection: 'row', marginTop: 30, alignContent: 'stretch'}}>
              <UIText fontSize="16" styles={{width: '45%', alignItems: 'flex-end'}}>Backup Phone : </UIText>
              <UIText fontSize="16" fontWeight="bold" styles={{width: '50%', alignItems: 'flex-start'}}>{this.state.orderDetails.backup_phone}</UIText>
            </View>
            ) : null
        }
        {
          this.state.orderDetails.email ? (
          <View style={{flexDirection: 'row', marginTop: 30, alignContent: 'stretch'}}>
            <UIText fontSize="16" styles={{width: '45%', alignItems: 'flex-end'}}>Email : </UIText>
            <UIText fontSize="16" fontWeight="bold" styles={{width: '50%', alignItems: 'flex-start'}}>{this.state.orderDetails.email}</UIText>
          </View>
          ) : null
        }
        
        <View style={{flexDirection: 'row', marginTop: 30, alignContent: 'stretch'}}>
          <UIText fontSize="16" styles={{width: '45%', alignItems: 'flex-end'}}>Location : </UIText>
          <UIText fontSize="16" fontWeight="bold" styles={{width: '50%', alignItems: 'flex-start'}}>{this.state.orderDetails.address != '' ? this.state.orderDetails.address : 'Your Location'}</UIText>
        </View>
        
        <View style={{flexDirection: 'row', marginTop: 30, alignContent: 'stretch', marginBottom: 20}}>
          <UIText fontSize="16" styles={{width: '45%', alignItems: 'flex-end'}}>Payment Type : </UIText>
          <UIText fontSize="16" fontWeight="bold" styles={{width: '50%', alignItems: 'flex-start'}}>{this.state.payment.name}</UIText>
        </View>
        
        <UIText fontSize="22" textAlign="center" fontWeight="normal">ESTIMATED TIME</UIText>
        <UIText fontSize="26" textAlign="center" fontWeight="bold">{this.state.deliveryTime.time}</UIText>

        <UIButton title="Main Menu" onPress={() => this.props.navigation.navigate('Home')} />
        <View style={{marginBottom: 20}}></View>
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
