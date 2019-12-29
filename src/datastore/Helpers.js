import React from 'react';
import {
	PermissionsAndroid
} from 'react-native';


export const Helper = {

	requestPermission: async () => {
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
	        
	      } else {
	        alert('Permission not granted!');
	      }
	};

	getCurrentLocation: async () => {
		PermissionsAndroid.check(PermissionsAndroid.PERMISSIONS.ACCESS_FINE_LOCATION).then(p => {
			Geolocation.getCurrentPosition(
	            (info) => {
	                console.log(info);
	                this.setState({locationError: false, location: { latitude: info.latitude, longitude: info.longitude }});
	                Storage.set('@location', { latitude: info.latitude, longitude: info.longitude });
	            },
	            (error) => {
	                console.log(error.code, error.message);
	            },
	            { enableHighAccuracy: true, timeout: 15000, maximumAge: 10000 }
          	);
		});
	};

};