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
  ScrollView
} from 'react-native';

import { UIText, UIButton, UIContainer, UILoader, UIHeaderOptions, UIPicker, UIIcon, UIImage } from '../../components/InputComponents';
import { CallApi, GetData } from '../../datastore/ApiData';
import MapView, { Marker } from 'react-native-maps';
import Storage from '../../components/Storage';
import Geolocation from 'react-native-geolocation-service';

export default class Step2 extends Component {
  static navigationOptions = UIHeaderOptions();
  constructor(props) {
    super(props);
    this.state = {
      user: props.navigation.getParam('user'),
      fuelType: props.navigation.getParam('selectedFuelType'),
      companies: [
        {id: 1, name: 'Shell'},
        {id: 2, name: 'PSO'},
      ],
      stations: [

      ],
      filteredStations: [
      ],
      seletedStationIndex: 0,
      isLoading: true,
      pickerItems: [],
      mapReady:false,
      locationReady: false,
      location: {
        latitude: 24.870862,
        longitude: 67.114544,
        latitudeDelta: 0.0922,
        longitudeDelta: 0.0421,
      },
      region: {
        latitude: 24.870862,
        longitude: 67.114544,
        latitudeDelta: 0.0922,
        longitudeDelta: 0.0421,
      },

    };

  }

  watchID = null;

  componentDidMount() {
    // GetData('companies', {
    //     fields: ['id', 'name', 'image_url']
    // }).then(response => {
    //     this.setState({companies: response['data']});
    // });
    
    // GetData('stations', {
    //     filters: { city: 'karachi' }, with: [ 'company' ]
    // }).then(response => {
    //   var pickerItems = [];
    //   this.state.stations.map((station, ind) => {
    //     pickerItems.push({id: station.id, label: `${station.company.name} - ${station.name}`});     
    //   });
    //   this.setState({stations: response['data'], isLoading: false,pickerItems: pickerItems, filteredStations: response['data']});
    // });

    // this.watchID = 
    Geolocation.getCurrentPosition(
        (info) => {
          this.setState({
                locationReady: true, 
                region: {...this.state.region, latitude: info.coords.latitude, longitude: info.coords.longitude},
                location: {...this.state.location, latitude: info.coords.latitude, longitude: info.coords.longitude},
          });
          Storage.set('@location', info.coords);
          console.log('location', this.state.region)
          this.GetStations();
        },
        (error) => {
            console.log(error.code, error.message);
        },
        { enableHighAccuracy: true, timeout: 15000, maximumAge: 10000 }
    );

  }

  GetStations = () => {
    CallApi('find', {
      latitude: this.state.location.latitude,
      longitude: this.state.location.longitude
    }).then(response => {
      var pickerItems = [];
      this.state.stations.map((station, ind) => {
        pickerItems.push({id: station.id, label: `${station.company.name} - ${station.name}`});     
      });
      this.setState({stations: response['data'], isLoading: false, pickerItems: pickerItems, filteredStations: response['data']});
    });
  }

  componentWillUnmount() {
    // Geolocation.clearWatch(this.watchID);
  }

  onCompanySelect = (index) => {
    // var selected = this.state.companies[index];
    alert('This feature is not yet available');
  };

  onStationChange = (index) => {
    this.setState({seletedStationIndex: index});
  };

  onRegionChange = (region) => {
    // this.setState({ region });
  };

  onMapReady = () => {
    this.setState({mapReady: true});
  };

  orderContinue = () => {
    var selected = this.state.stations[this.state.seletedStationIndex];
    this.props.navigation.navigate('Step3', {
        selectedFuelType: this.state.fuelType,
        selectedStation: selected,
        user: this.state.user
    });
  };

  onOrderClick = (station) => {
    
  }

  render() {
    var content = !this.state.isLoading ? (
      <View style={{height: '100%'}}>
        <View style={{position: 'relative', height: '35%',}}>
          <MapView
              style={styles.map}
              // initialRegion={this.state.location}
              region={this.state.region}
              onRegionChange={this.onRegionChange}
              onMapReady={this.onMapReady}
              enableZoomControl={true}
            >
              {this.state.mapReady && this.state.locationReady && (
                <Marker
                  coordinate={{latitude: this.state.location.latitude, longitude: this.state.location.longitude}}
                  title="Your Location"
                  >
                  <UIIcon name="navigation" />
                </Marker>
              )}
              {this.state.mapReady && this.state.locationReady && this.state.filteredStations.map((marker, i) => {
              
                return (  
                  <Marker
                    key={i}
                    coordinate={{ latitude: marker.location[0], longitude: marker.location[1]}}
                    title={marker.name}
                    description={marker.address}
                    pinColor="#ffd500"
                  />
                );
              })
              }
            </MapView>

            <UIIcon onPress={() => this.setState({region: this.state.location})}
              name="my-location" style={{ color: '#555', borderRadius: 50, backgroundColor: '#fff', padding: 4}} 
                      containerStyle={{ position: 'absolute', right: 10, bottom: 10, }} />
        </View>
        <View style={{height: '55%',}}>
          <ScrollView contentContainerStyle={{flexDirection: 'column'}}>
            {this.state.filteredStations.map((station, i) => (
              <View key={i} style={{height: 100, 
                                    flexDirection: 'row', 
                                    backgroundColor: '#ccc', width: '95%', 
                                    alignSelf: "center", 
                                    justifyContent: 'space-around',
                                    borderRadius: 10, marginTop: 10, 
                                    padding: 2,
                                    }}>
                                    
                {/* <UIImage src={station.company.image_url} width={60} height={60} styles={{alignSelf:'center',}} /> */}
                
                <Image source={{uri: station.company.image_url}} style={{width: 60, height: 60}} />
                <View style={{marginLeft: 10, justifyContent: "center"}}>
                  {station.prices.map((p, pi) => (
                    <UIText styles={{marginTop: 1}} textStyles={{ textAlign: 'right' }}>{p.fuel_type.name}</UIText>
                  ))}
                </View>
                <View style={{marginLeft: 10, justifyContent: "center"}}>
                {station.prices.map((p, pi) => (
                    <UIText styles={{marginTop: 1,}} 
                            textStyles={{ textAlign: 'left', fontFamily: 'Digital Display Regular' }}>
                              {p.amount}
                            </UIText>
                  ))}
                  
                </View>
                <View style={{marginLeft: 10, height: 100, justifyContent: "center"}}>
                  {Object.keys(station.misc).map(mv => {
                    var imgs = {
                      'atm': require('../../../assets/images/atm.png'), 
                      '24_hour' : require('../../../assets/images/24_hour.png'), 
                      'car_wash' : require('../../../assets/images/car_wash.png'), 
                      'shop' : require('../../../assets/images/shop.png'), 
                      'cafe' : require('../../../assets/images/cafe.png')
                    };
                    if(Object.keys(imgs).indexOf(mv) > -1) {
                      return (
                        <Image 
                          source={imgs[mv]}
                          style={{width: 20, height: 20}}
                          onError={(e) => console.log(e)} />
                      );
                    }
                  }
                  )}
                </View>
                <View style={{justifyContent: 'center',}}>
                  <TouchableOpacity onPress={() => this.onOrderClick(station)}>
                    <Image source={require('../../../assets/images/location-arrow.png')} 
                            style={{width: 60, height: 60}}
                            resizeMode="contain" />
                    <UIText textAlign="center" fontSize="18" styles={{marginTop: 0}}>Order</UIText>
                  </TouchableOpacity>
                </View>
              </View>
            ))}
              {/*<UIText textAlign="center" fontSize="22" styles={{marginTop: 20}}>Who would you like your</UIText>
              <UIText textAlign="center" fontSize="22" >{this.state.fuelType.name.toLowerCase()} delivered from?</UIText>

              <View style={{flexDirection: 'row', marginTop: 30, alignContent: 'stretch'}}>
                  
                  <UIText textAlign="center" styles={{marginRight: 15, alignSelf: 'center'}}>Find my closest</UIText>
                  <View style={{flexDirection: 'column', width: '60%',}}>
                      {this.state.companies && this.state.companies.map((type, ind) => (
                          <UIButton styles={{width: '100%'}} key={ind} title={type.name} onPress={() => this.onCompanySelect(ind)}></UIButton>
                      ))}
                  </View>

              </View>
              <View style={{flexDirection: 'row', marginTop: 30, alignContent: 'stretch'}}>
                  
                  <UIText textAlign="center" styles={{marginRight: 15, alignSelf: 'center'}}>Pick you favourite</UIText>
                  
                  <UIPicker 
                    styles={{flexDirection: 'column', width: '60%',}} 
                    items={this.state.stations.map((v, k) => ({val: v.id, label: `${v.company.name} - ${v.name}`}))} 
                    onChange={(itemVal, itemInd) => this.onStationChange(itemInd)} />
              </View>
                
              <UIButton title="Continue to order" onPress={() => this.orderContinue()} />*/}
          </ScrollView>  
        </View>
        <View style={{height: '10%'}}>
          
          <View style={styles.footerContainer}>
            <TouchableOpacity style={[styles.footerButton, {color: 'black'}]}>
              <UIIcon
                provider="fontawesome"
                name="filter" />
              <UIText textAlign="center" fontSize="14">Filter</UIText>
            </TouchableOpacity>
            <TouchableOpacity style={styles.footerButton}>
              <UIIcon
                provider="materialcommunity"
                name="truck-delivery"
                style={{color: 'black'}} />
              <UIText textAlign="center" fontSize="14">Order</UIText>
            </TouchableOpacity>
          </View>
        </View>
      </View>
    ) : (<UILoader />);

    return content;
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f9f9f9',
    overflow: 'scroll'
  },
  mapContainer: {
    ...StyleSheet.absoluteFillObject,
    flex: 1,
  },
  map: {
    width: '100%',
    height: '100%',
    marginLeft: 0
  },

  footerContainer: {
    backgroundColor: "#FFF",
    flexDirection: "row",
    alignItems: "center",
    flexWrap: "nowrap",
    justifyContent: "space-around",
    elevation: 3,
    shadowOffset: {
      height: -2,
      width: 0
    },
    shadowColor: "#111",
    shadowOpacity: 0.2,
    shadowRadius: 1.2,
  },

  footerButton: {
    flex: 1.06,
    alignItems: "center",
    justifyContent: "center",
    paddingTop: 8,
    paddingBottom: 10,
    minWidth: 80,
    maxWidth: 168,
    paddingHorizontal: 12
  }
});
