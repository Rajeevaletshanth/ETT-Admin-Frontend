import axios from 'axios';
import config from '../configs/config.json';
import getAccessToken from './AccessToken';

export async function getAllCards (id) {
    return new Promise((resole, reject) => {
        axios.get(`${config.SERVER_URL}/card/get_allcards/${id}`, 
        {headers: {
                'Authorization': `Bearer ${getAccessToken()}`
            }
        }).then((res) => {                           
            resole(res)
        }).catch((err) => {
            reject(err)
        })
    })
}

export async function attachCard (id, data) {
    return new Promise((resole, reject) => {
        axios.post(`${config.SERVER_URL}/card/add_card/${id}`, 
        data,
        {headers: {
                'Authorization': `Bearer ${getAccessToken()}`
            }
        }).then((res) => {                           
            resole(res)
        }).catch((err) => {
            reject(err)
        })
    })
}

export async function detachCard (id, data) {
    return new Promise((resole, reject) => {
        axios.post(`${config.SERVER_URL}/card/remove_card/${id}`, 
        data,
        {headers: {
                'Authorization': `Bearer ${getAccessToken()}`
            }
        }).then((res) => {                           
            resole(res)
        }).catch((err) => {
            reject(err)
        })
    })
}

export async function changePrimaryCard (id, data) {
    return new Promise((resole, reject) => {
        axios.put(`${config.SERVER_URL}/card/change_primary_card/${id}`, 
        data,
        {headers: {
                'Authorization': `Bearer ${getAccessToken()}`
            }
        }).then((res) => {                           
            resole(res)
        }).catch((err) => {
            reject(err)
        })
    })
}
