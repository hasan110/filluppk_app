import React from 'react'
import AsyncStorage from '@react-native-community/async-storage'

const Storage = {
	
	has: async (key) => {
		var value = null;
		try {
			value = await AsyncStorage.getItem(key);
		} catch (e) {
			console.log('storage_error', e)
		}
		return value != null;
	},

	get: async (key) => {

		return await AsyncStorage.getItem(key)
			.then(data => {
				try {
					data = JSON.parse(data);
				} catch(e) { console.log('storage_error_json', e) }

				return data;
			})
			.catch(e => console.log('storage_error_get', e));
	
		return false;
	},

	set: async (key, value) => {
		try {
			return await AsyncStorage.setItem(key, (typeof(value) == 'object') ? JSON.stringify(value) : value)
			.then(d => d)
			.catch(e => console.log('storage_error_set', e));
		} catch(e) {
			console.log('storage_error_set', e);
		}
	},

	remove: async (key) => {
		return await AsyncStorage.removeItem(key)
			.then(d => d)
			.catch(e => console.log('storage_error_remove', e));
	},

	clear: async () => {
		try {
			await AsyncStorage.clear();
			return true;
		} catch(e) { console.log('storage_error_clear', e) }

		return false;
	}


};

export default Storage;