import React, {Component} from "react"
import axios from "axios";
import Cookies from 'universal-cookie';

class Ajax extends Component {
    static async delete(endpoint, params = {}){
        const cookies = new Cookies();
        let config = {
            params: params,
            headers: { 'Authorization': `Bearer ${cookies.get('access_token')}` }
        };
        return await axios.delete(`${window.$api}${endpoint}`, config).then(res => {
            return {status: 'success', data: res.data};
        })
            .catch(err => {
                let err_data = err?.response?.data ?? []
                let errors = err_data.message ? [err_data.message] : err_data
                return {
                    status: 'error',
                    errors: Object.values(errors)
                }
            })
    }

    static async get(endpoint, params = {}){
        const cookies = new Cookies();
        params.lang = cookies.get('lang');
        let config = {
            params: params,
            headers: { 'Authorization': `Bearer ${cookies.get('access_token')}` }
        };
        return await axios.get(`${window.$api}${endpoint}`, config).then(res => {
            return {status: 'success',data: res.data};
        })
            .catch(err => {
                let err_data = err?.response?.data ?? []
                let errors = err_data.message ? [err_data.message] : err_data
                return {
                    status: 'error',
                    errors: Object.values(errors)
                }
            })
    }

    static async post(endpoint, params = {}){
        const cookies = new Cookies();
        let config = {
            headers: { 'Authorization': `Bearer ${cookies.get('access_token')}` }
        };
        return await axios.post(`${window.$api}${endpoint}`, params, config).then(res => {
            return {status: 'success',data: res.data};
        })
            .catch(err => {
                let err_data = err?.response?.data ?? []
                let errors = err_data.message ? [err_data.message] : err_data
                return {
                    status: 'error',
                    errors: Object.values(errors)
                }
            })
    }

}
export default Ajax