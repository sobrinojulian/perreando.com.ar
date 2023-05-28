import axiosClient from './axiosClient.js'
const apiClient = axiosClient.getApiClient()

const busquedaPaseadores = (zona, horario) => {
    return apiClient.get(`/api/paseador/${zona}/${horario}`)
}

export default {
    busquedaPaseadores
}