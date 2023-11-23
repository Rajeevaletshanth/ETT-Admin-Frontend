import axios from 'axios';
import config from '../configs/config.json';
import getAccessToken from './AccessToken';

export async function changePassword (id, data, user = 'admin') {
    return new Promise((resolve, reject) => {
        axios.put(`${config.SERVER_URL}/${user}/change_password/${id}`, data,
        {headers: {
                'Authorization': `Bearer ${getAccessToken()}`
            }
        }).then((res) => {                           
            resolve(res)
        }).catch((err) => {
            reject(err)
        })
    })
}

export async function getAdminDet (id, user = 'admin') {
    return new Promise((resolve, reject) => {
        axios.get(`${config.SERVER_URL}/${user}/${id}`, 
        {headers: {
                'Authorization': `Bearer ${getAccessToken()}`
            }
        }).then((res) => {                           
            resolve(res)
        }).catch((err) => {
            reject(err)
        })
    }) 
}

export async function editAdminDet (id, data, user = 'admin') {
    return new Promise((resolve, reject) => {
        axios.put(`${config.SERVER_URL}/${user}/edit/${id}`, data,
        {headers: {
                'Authorization': `Bearer ${getAccessToken()}`
            }
        }).then((res) => {                           
            resolve(res)
        }).catch((err) => {
            reject(err)
        })
    })
}
