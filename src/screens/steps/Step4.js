import React, {Component} from 'react';
import {
  Platform,
  StyleSheet,
  View,
  TouchableOpacity,
  ImageBackground,
} from 'react-native';

import { UICheckBox, InputText, UIText, UIButton, UIContainer, UIPicker, UILoader, UIHeaderOptions } from '../../components/InputComponents';
import { PostData, GetData } from '../../datastore/ApiData';
import Storage from '../../components/Storage';
import Geolocation from 'react-native-geolocation-service';

export default class Step4 extends Component {
  static navigationOptions = UIHeaderOptions();
  constructor(props) {
    super(props);
    this.state = {
      user: props.navigation.getParam('user'),
      station: props.navigation.getParam('selectedStation'),
      fuelType: props.navigation.getParam('selectedFuelType'),
      price: props.navigation.getParam('selectedPrice'),
      quantity: props.navigation.getParam('selectedQuantity'),
      amount: props.navigation.getParam('totalAmount'),
      canister: props.navigation.getParam('includeCanister'),
      canister_price: props.navigation.getParam('canisterPrice'),
      delivery_type: props.navigation.getParam('deliveryType'),
      payment_types: [],
      selectedPaymentType: 0,
      useLocation: true,

      userData: {
        name: '',
        phone: '',
        backup_phone: '',
        email: '',
        address: '',
        location: [],
        payment_type_id: 1
      },

      isLoaded: false
    };

    

  }

  componentDidMount() {
    GetData('payment_types', {
        fields: ['id', 'code', 'name', 'image_url']
    }).then(response => {
        this.setState({payment_types: response['data'], isLoaded: true, selectedPaymentType: response['data'][0]});
    });

    Storage.get('@location').then(l => {
      if(l) {
        this.setState({userData: {...this.state.userData, location: [l.latitude, l.longitude]}})
      } else {
        
      }
    });
  }

  orderContinue = () => {
    var data = this.state.userData;
    if(data.name != '' && data.phone != '' && data.payment_type_id > 0 ) {
      var postData = {
        user_id: this.state.user.id,
        station_id: this.state.station.id,
        fuel_type_id: this.state.fuelType.id,
        delivery_time_id: this.state.delivery_type.id,
        include_canister: this.state.canister,
        canister_price: this.state.canister_price,
        sub_total: (this.state.price * this.state.quantity),
        total_amount: this.state.amount,
        quantity: this.state.quantity,
        
        ...data
      };

      PostData('order', postData).then(d => {
        this.props.navigation.navigate('Step5', {
            amount: this.state.amount,
            orderDetail: this.state.userData,
            payment: this.state.selectedPaymentType,
            delivery_time: this.state.delivery_type
        });
      });
      

    } else {
      alert('Please fill all the required fields!')
    }
  };

  onPaymentTypeChange = (val, ind) => {
    var selected = this.state.payment_types[ind];
    this.state.setState({selectedPaymentType: selected, userData: {...this.state.userData, payment_type_id: val}});
  };

  onCurrentLocationCB = (c) => {
    var address = c ? '' : this.state.userData.address;
    this.setState({useLocation: c, userData: { ...this.state.userData, address: address }});
  };

  render() {
    var payment_items = [];
    this.state.payment_types.map((val, ind) => {
      payment_items.push({id: val.id, label: val.name})
    });

    var content = this.state.isLoaded ? (
      <UIContainer style={styles.container}>
        <UIText textAlign="center" fontWeight="bold" fontSize="26">AMOUNT</UIText>
        <UIText textAlign="center" fontWeight="bold" fontSize="30">Rs {this.state.amount}</UIText>
        
        <InputText defaultValue={this.state.userData.name} type="text" title="Name *" onChange={(val) => this.setState({userData: {...this.state.userData, name: val, } })} />
        <InputText defaultValue={this.state.userData.phone} type="phone" title="Phone *" onChange={(val) => this.setState({userData: {...this.state.userData, phone: val, } })} />
        <InputText defaultValue={this.state.userData.backup_phone} type="phone" title="Backup Phone" onChange={(val) => this.setState({userData: {...this.state.userData, backup_phone: val, } })} />
        <InputText defaultValue={this.state.userData.email} type="email" title="Email" onChange={(val) => this.setState({userData: {...this.state.userData, email: val, } })} />
        
        <InputText editable={!this.state.useLocation} defaultValue={this.state.userData.address} type="text" title="Address" onChange={(val) => this.setState({userData: {...this.state.userData, address: val, } })} />
        
        <UICheckBox styles={{marginTop: 15, marginBottom: 15}} default={this.state.useLocation} onChange={this.onCurrentLocationCB}> Your current location? </UICheckBox>
        
        <UIPicker title="Select Payment Method" items={payment_items} onChange={this.onPaymentTypeChange} />

        <UIButton title="Place Order" onPress={() => this.orderContinue()} />
        <View style={{marginBottom: 20}}></View>
      </UIContainer>
    ) : (<UILoader />);

    return content;
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,

    backgroundColor: '#f9f9f9',
  },
});
