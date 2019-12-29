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

import {UIText, UIButton, UIContainer, UIPicker, UICheckBox, UIImage, UILoader, UIHeaderOptions, Helper} from '../../components/InputComponents';
import { GetData } from '../../datastore/ApiData';

export default class Step3 extends Component {
  static navigationOptions = UIHeaderOptions();
  constructor(props) {
    super(props);
    this.state = {
      user: props.navigation.getParam('user'),
      fuelType: props.navigation.getParam('selectedFuelType'),
      company: props.navigation.getParam('selectedCompany'),
      station: props.navigation.getParam('selectedStation'),
      fuelSubTypes: [

      ],
      prices: [

      ],
      deliveryTimes: [
        {}
      ],
      includeCanister: false,
      canisterPrice: 0,
      totalAmount: 0,

      fuelTypeSelect: {id: 0, name: 'Select Fuel Type'},
      selectedFuelSubType: 0,
      selectedPrice: 0,
      selectedQuantity: 0,
      selectedDeliveryTime: 0, 

      fuelPricesItems: [],
      isLoaded: false
    };

  }

  componentDidMount() {
    GetData('fuel_types', {
        fields: ['id', 'name', 'company_id'], filters: { parent_id: this.state.fuelType.id, company_id: this.state.station.company.id }
    }).then(response => {
        var fdata = [this.state.fuelTypeSelect, ...response['data']]
        this.setState({fuelSubTypes: fdata, selectedFuelSubType: fdata[0]});
        GetData('delivery_times', {
            fields : ["id", "name", "price", "time"],
        }).then(response => {
            this.setState({deliveryTimes: response['data'], isLoaded: true, selectedDeliveryTime: response['data'][0], totalAmount: response['data'][0].price});
        });
    }).catch(e => console.log('error'));

  }

  orderContinue = () => {

    if(this.state.selectedPrice == 0) {
      alert('Please select quantity!');
      return;
    }
    var dataToPass = {
        selectedStation: this.state.station,
        selectedFuelType: this.state.selectedFuelSubType,
        selectedPrice: this.state.selectedPrice,
        selectedQuantity: this.state.selectedQuantity,
        totalAmount: this.state.totalAmount,
        selectedDeliveryTime: this.state.selectedDeliveryTime,
        includeCanister: this.state.includeCanister,
        canisterPrice: this.state.canisterPrice,
        deliveryType: this.state.selectedDeliveryTime,
        user: this.state.user,
    };
    this.props.navigation.navigate('Step4', dataToPass);

  };
  
  onFuelTypeChange = (val, ind) => {
    var selected = this.state.fuelSubTypes[ind];
    if(val == 0) {
      var totalAmount = this.state.selectedDeliveryTime.price;
      this.setState({selectedFuelSubType: selected, isLoaded: true, includeCanister: false, canisterPrice: 0, fuelPricesItems: [], totalAmount: totalAmount});
      return;
    }
    this.setState({selectedFuelSubType: selected, isLoaded: false, includeCanister: false});
    GetData('prices', {
          filters: { station_id: this.state.station.id, fuel_type_id: selected.id }
      }).then(response => {
          if(response['total'] && response['total'] > 0) {
            var price = response['data'][0];
            var items = [];
            
            for(let i = 0; i <= 50; i = i + 5) {
                var vv = i;
                if(i == 0)
                    vv = 1;
                items.push({val: vv, label: `${vv}${price.quantity_unit} (+Rs ${(price.amount * vv).toFixed(2)})`});
            }

            var totalAmount = (price.amount * items[0].val);
            if(!(this.state.selectedDeliveryTime == 0))
              totalAmount += this.state.selectedDeliveryTime.price;
            if(this.state.includeCanister){
              totalAmount += price.canister_price;
            }

            this.setState({
                          fuelPricesItems: items, 
                          isLoaded: true, 
                          selectedPrice: price.amount,
                          selectedQuantity: items[0].val,
                          prices: price,
                          canisterPrice: price.canister_price,
                          totalAmount: totalAmount,
                        });
          } else {
            alert('No data could be found the for selected station', 'Sorry!');
            this.props.navigation.goBack();
          }
      });

  };

  onFuelPriceChange = (val, ind) => {
    if(this.state.selectedFuelSubType.id > 0) {
      var currentSelected = this.state.selectedPrice;
      var totalAmount = this.state.totalAmount - currentSelected;

      var selected = (this.state.prices.amount * val);
      this.setState({
                      selectedPrice: selected,
                      selectedQuantity: val,
                      totalAmount: (totalAmount + selected).toFixed(2)
                    });
    }
  }

  onDeliveryTimeChange = (val, ind) => {
    var currentSelected = this.state.selectedDeliveryTime;
    var selected = this.state.deliveryTimes[ind];
    var totalAmount = this.state.totalAmount - ( currentSelected == 0 ? 0 : currentSelected.price );
    this.setState({selectedDeliveryTime: selected, totalAmount: totalAmount+selected.price});
  } 

  onCanisterCBChange = (checked) => {

    var totalAmount = parseFloat(this.state.totalAmount.toString());

    if(checked) {
      totalAmount = (totalAmount + this.state.canisterPrice).toFixed(2);
    } else {
      totalAmount = (totalAmount - this.state.canisterPrice).toFixed(2);
    }

    this.setState({includeCanister: checked, totalAmount: totalAmount});
  };

  render() {
    var content = this.state.isLoaded ? (
      <UIContainer style={styles.container}>
        <UIText textAlign="center" fontSize="22" styles={{marginTop: 20, marginBottom: 30}}>How much {this.state.fuelType.name.toLowerCase()} do you need delivered and when?</UIText>
        
        <UIImage src={this.state.station.company.image_url} width="50%" caption={this.state.station.company.name} />

        <UIPicker default={this.state.selectedFuelSubType.id} title="Type of petrol needed" items={this.state.fuelSubTypes.map((v, k) => ({val: v.id, label: `${v.name}`}))} onChange={this.onFuelTypeChange} />
        
        <UIPicker title="Select Quantity" items={this.state.fuelPricesItems} onChange={this.onFuelPriceChange} />

        <UIPicker title="Delivery Time" items={this.state.deliveryTimes.map((v, k) => ({val: v.id, label: `${v.name} - (+Rs ${v.price})`}))} onChange={this.onDeliveryTimeChange} />

        <UICheckBox styles={{marginTop: 15, marginBottom: 15}} default={false} onChange={this.onCanisterCBChange}>Would you like to buy the canister? (+) </UICheckBox>
        
        {this.state.includeCanister ? (
          <View>
            <UIText textAlign="center">CANISTER PRICE</UIText>
            <UIText textAlign="center" fontWeight="bold" fontSize="28">{ 'Rs ' + this.state.canisterPrice }</UIText>
          </View>
        ) : null}
          <View>
            <UIText textAlign="center">TOTAL AMOUNT</UIText>
            <UIText textAlign="center" fontWeight="bold" fontSize="28">{ 'Rs ' + this.state.totalAmount }</UIText>
          </View>
        <UIButton title="Continue to order" onPress={() => this.orderContinue()} />
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
