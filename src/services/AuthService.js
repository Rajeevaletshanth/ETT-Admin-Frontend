import {ApiService} from './ApiService';
import axios from 'axios';
import config from '../configs/config.json';

export async function apiSignIn (data) {
    return axios.post(
        `${config.SERVER_URL}/admin/login`, data
    )
}

export async function apiSignUp (data) {
    return axios.post(
        `${config.SERVER_URL}/admin/register`, data
    )
}

export async function apiSignOut (data) {
    return ApiService.fetchData({
        url: '/sign-out',
        method: 'post',
        data
    })
}

export async function apiForgotPassword (data) {
    return axios.post(
        `${config.SERVER_URL}/admin/forgot_password`, data
    )
}

export async function apiResetPassword (id, token, password) {
    return axios.post(
        `${config.SERVER_URL}/admin/reset_password/${id}/${token}`, { password }
    )
}



