import axiosClient from './axiosClient.js'
const apiClient = axiosClient.getApiClient()

const loginUser = (username, password) => {
    return apiClient.get(`/api/users/login/${username}/${password}`)
}

const registerUser = user => {
    return apiClient.post(`/api/users/register`, user)
}

const editUser = (id, user) => {
    return apiClient.put(`/api/users/edit/${id}`, user)
}

const deleteUser = id => {
    return apiClient.delete(`/api/users/delete/${id}`)
}

export default {
    loginUser,
    registerUser,
    editUser,
    deleteUser
}