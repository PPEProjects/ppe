import {Component} from "react"
import axios from "axios";
import Cookies from 'universal-cookie';

const createUser = (e) => {
    axios.post('/user', {
        firstName: 'Fred',
        lastName: 'Flintstone'
    })
        .then(function (response) {
            console.log(response);
        })
        .catch(function (error) {
            console.log(error);
        });
}

class Ajax extends Component {

    static async delete(endpoint, params = {}) {
        const cookies = new Cookies();
        let config = {
            params: params,
            headers: {'Authorization': `Bearer ${cookies.get('access_token')}`}
        };
        return await axios.delete(`${window.$api}${endpoint}`, config).then(res => {
            return {
                status: 'success',
                data: res.data,
                errors: [],
            };
        })
            .catch(err => {
                let err_data = err?.response?.data ?? []
                let errors = err_data.message ? [err_data.message] : err_data
                return {
                    status: 'error',
                    data: [],
                    errors: Object.values(errors),
                }
            })
    }

    static async get(endpoint, params = {}) {
        const cookies = new Cookies();

        let config = {
            params: {...params, lang: cookies.get("lang") ?? "English"},
            headers: {'Authorization': `Bearer ${cookies.get('access_token')}`}
        };
        return await axios.get(`${window.$api}${endpoint}`, config).then(res => {
            return {
                status: 'success',
                data: res.data,
                errors: [],
            };
        })
            .catch(err => {
                let err_data = err?.response?.data ?? []
                let errors = err_data.message ? [err_data.message] : err_data
                return {
                    status: 'error',
                    data: [],
                    errors: Object.values(errors),
                }
            })
    }

    static async post(endpoint, params = {}) {
        const cookies = new Cookies();
        let config = {
            headers: {'Authorization': `Bearer ${cookies.get('access_token')}`}
        };
        return await axios.post(`${window.$api}${endpoint}`, params, config).then(res => {
            return {
                status: 'success',
                data: res.data,
                errors: [],
            };
        })
            .catch(err => {
                let err_data = err?.response?.data ?? []
                let errors = err_data.message ? [err_data.message] : err_data;

                return {
                    status: 'error',
                    data: [],
                    errors: Object.values(errors),
                }
            })
    }

    static async put(endpoint, params = {}) {
        if (params instanceof FormData) {
            params.append("_method", "put")
        } else {
            params._method = 'put'
        }
        let res = await this.post(endpoint, params)
        return res
    }

    static async put1(endpoint, params = {}) {
        const cookies = new Cookies();
        let config = {
            headers: {
                'Authorization': `Bearer ${cookies.get('access_token')}`,
            },
        };
        if (params instanceof FormData) {
            params.append("_method", "put")
        } else {
            params._method = 'put'
        }
        return await axios.post(`${window.$api}${endpoint}`, params, config).then(res => {
            return {
                status: 'success',
                data: res.data,
                errors: [],
            };
        })
            .catch(err => {
                let err_data = err?.response?.data ?? []
                let errors = err_data.message ? [err_data.message] : err_data
                return {
                    status: 'error',
                    data: [],
                    errors: Object.values(errors),
                }
            })
    }
}

export default Ajax
