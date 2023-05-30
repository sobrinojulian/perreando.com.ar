import axiosClient from './axiosClient.js'
const apiClient = axiosClient.getApiClient()

const busquedaPaseadores = (z, h) => {
    let zona = z == '' ? 0 : z
    let horario = h == '' ? 0 : h
    return apiClient.get(`/api/paseador/${zona}/${horario}`)
}

export default {
    busquedaPaseadores
}