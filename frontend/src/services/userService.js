import axiosClient from './axiosClient.js'
const apiClient = axiosClient.getApiClient()

const login = user => {
    return apiClient.get(`/api/users/login/${user.username}/${user.password}`)
    //return apiClient.get(`/api/users/login', user)
}

const register = user => {
    return apiClient.post('/api/users/register', user)
}

const editUser = user => {
    return apiClient.put('/api/users/edit', user)
}

const deleteUser = username => {
    return apiClient.delete(`/api/users/delete/${username}`)
    //return apiClient.delete('/api/users/delete', user)
}

export default {
    login,
    register,
    editUser,
    deleteUser
}