import axiosClient from './axiosClient.js'
const apiClient = axiosClient.getApiClient()

const busquedaPaseadores = (z, h) => {
    let zona = z == '' ? 0 : z
    let horario = h == '' ? 0 : h
    return apiClient.get(`/api/paseadores/${zona}/${horario}`)
}

const obtenerDisponibilidades = id => {
    return apiClient.get(`/api/paseadores/${id}`)
}

const deleteDisponibilidad = id => {
    return apiClient.delete(`/api/paseadores/delete/${id}`)
}

const cargarDisponibilidad = dispo => {
    return apiClient.post('/api/paseadores/cargar', dispo)
}

export default {
    busquedaPaseadores,
    obtenerDisponibilidades,
    deleteDisponibilidad,
    cargarDisponibilidad
}