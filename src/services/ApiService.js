import BaseService from './BaseService';
import axios from 'axios';
import config from '../configs/config.json';
import getAccessToken from './AccessToken';

export const ApiService = {
    fetchData(param) {
        return new Promise((resolve, reject) => {
            BaseService(param).then(response => {
                resolve(response)
            }).catch(errors => {
                reject(errors)
            })
        })
    }
}

export async function authenticate () {
    return new Promise((resole, reject) => {
        axios.get(`${config.SERVER_URL}/validate`,
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

export async function uploadFile (data) {
    return new Promise((resolve, reject) => {
        const formdata = new FormData(); 
        formdata.append('file', data[0]);
        axios.post(`${config.SERVER_URL}/uploadSingle`, formdata,{
          headers: { "Content-Type": "multipart/form-data" }
        }).then((res) => {
            resolve(res.data.filename)    
        }).catch((err) => {
            reject(err)
        })
    })
}

export async function downloadFile (data) {
    return new Promise((resole, reject) => {
        axios({
            url : `${config.SERVER_URL}/download/${data}`,
            method : "GET",
            responseType : "blob",
            headers: {
                'Authorization': `Bearer ${getAccessToken()}`
            }
        }).then((res) => {                     
            let blobfile = new File([res.data], "Profile")
            resole(blobfile)
        }).catch((err) => {
            reject(err)
        })
    }) 
}

export async function getAvatar (data) {
    return new Promise((resole, reject) => {
        axios({
            url : `${config.SERVER_URL}/getAvatar/${data}`,
            method : "GET",
            responseType : "blob"
        }).then((res) => {                     
            let blobfile = new File([res.data], "Profile")
            resole(blobfile)
        }).catch((err) => {
            reject(err)
        })
    }) 
}

export async function createLead (data) {
    return new Promise((resole, reject) => {
        axios.post(`${config.SERVER_URL}/superadmin/create`, 
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

export async function getAllLead () {
    return new Promise((resole, reject) => {
        axios.get(`${config.SERVER_URL}/superadmin/list`, 
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

export async function updateAccessControl (data) {
    return new Promise((resole, reject) => {
        axios.put(`${config.SERVER_URL}/superadmin/access_control/${data.id}`, 
        { authority: data.authority, is_deleted : data.is_deleted },
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

export async function getUnverifiedUsers () {
    return new Promise((resole, reject) => {
        axios.get(`${config.SERVER_URL}/superadmin/unverified_users`, 
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

export async function verifyUser (id) {
    return new Promise((resole, reject) => {
        axios.get(`${config.SERVER_URL}/superadmin/verify_user/${id}`, 
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

export async function resetLeadPassword (email) {
    return new Promise((resole, reject) => {
        axios.post(`${config.SERVER_URL}/superadmin/lead_reset_password`, { "email" : email },
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
