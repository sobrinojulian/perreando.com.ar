import axiosClient from './axiosClient.js'
const apiClient = axiosClient.getApiClient()

const login = user => {
    return apiClient.post('/api/users/login', user)
}

const register = user => {
    return apiClient.post('/api/users/register', user)
}

export default {
    login,
    register
}