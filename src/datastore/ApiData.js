import AsyncStorage from '@react-native-community/async-storage';
const HOST_NAME = 'https://fillup.pk';
const BASE_URL =  HOST_NAME + '/api/v1';

export function CheckUser(userData) {
    return {error: 'Please enter '}
}

function makeRequestInit(method, body, header = null) {
    return {
        method: method,
        headers: !header ? {
            'Accept': 'application/json',
            'Content-Type': 'application/json'
        } : header,
        body: JSON.stringify(body)
    };
}

export async function GetFuelTypes() {
    return fetch(`${BASE_URL}/list/fuel_types`, makeRequestInit('POST', {
        fields: ['id', 'slug', 'name', 'is_available'],
        filters: { is_shown: 1 }
    })
    ).then(res => res.json())
    .catch(e => console.log('promise_error_fuel_types_fetch', e));
}

export async function AuthApi(what, data) {
    return fetch(`${BASE_URL}/auth/${what}`, makeRequestInit('POST', data))
            .then(res => res.json())
            .catch(e => console.log(`request_error_${what}: ${e}`));
}

export async function CallApi(where, data) {
    return fetch(`${BASE_URL}/${where}`, makeRequestInit('POST', data))
            .then(res => res.json())
            .catch(e => console.log(`request_error_${where}: ${e}`));
}

export async function GetData(what, data) {
    return fetch(`${BASE_URL}/list/${what}`, makeRequestInit('POST', data))
            .then(res => res.json())
            .catch(e => console.log(`request_error_${what}: ${e}`));
}

export async function PostData(where, data) {
    return fetch(`${BASE_URL}/post/${where}`, makeRequestInit('POST', data))
            .then(res => res.json())
            .catch(e => console.log(`request_error_${where}: ${e}`));
}