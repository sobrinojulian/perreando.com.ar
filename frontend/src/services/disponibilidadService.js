import axiosClient from './axiosClient.js'
const apiClient = axiosClient.getApiClient()

const busquedaPaseadores = (z, h) => {
    let zona = z == '' ? 0 : z
    let horario = h == '' ? 0 : h
    return apiClient.get(`/api/disponibilidades/${zona}/${horario}`)
}

const obtenerDisponibilidadesByPaseador = paseadorId => {
    return apiClient.get(`/api/disponibilidades/${paseadorId}`)
}

const deleteDisponibilidad = id => {
    return apiClient.delete(`/api/disponibilidades/delete/${id}`)
}

const cargarDisponibilidad = dispo => {
    return apiClient.post('/api/disponibilidades/cargar', dispo)
}

export default {
    busquedaPaseadores,
    obtenerDisponibilidadesByPaseador,
    deleteDisponibilidad,
    cargarDisponibilidad
}