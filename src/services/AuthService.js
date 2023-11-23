import {ApiService} from './ApiService';
import axios from 'axios';
import config from '../configs/config.json';

export async function apiSignIn (data, user = "admin") {
    return axios.post(
        `${config.SERVER_URL}/${user}/login`, data
    )
}

export async function apiSignUp (data, user = "admin") {
    return axios.post(
        `${config.SERVER_URL}/${user}/register`, data
    )
}

export async function apiSignOut (data) {
    return ApiService.fetchData({
        url: '/sign-out',
        method: 'post',
        data
    })
}

export async function apiForgotPassword (data, user = "moderator") {
    return axios.post(
        `${config.SERVER_URL}/${user}/forgot_password`, data
    )
}

export async function apiResetPassword (id, token, password, user = "moderator") {
    return axios.post(
        `${config.SERVER_URL}/${user}/reset_password/${id}/${token}`, { password }
    )
}



