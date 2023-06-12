import axiosClient from './axiosClient.js'
const apiClient = axiosClient.getApiClient()

const obtenerMascotasByOwner = ownerId => {
    return apiClient.get(`/api/mascotas/${ownerId}`)
}

const obtenerMascotasById = id => {
    return apiClient.get(`/api/mascotas/${id}`)
}

const obtenerMascotas = () => {
    return apiClient.get(`/api/mascotas`)
}

const guardarMascota = mascota => {
    return apiClient.post(`/api/mascotas`, mascota)
}

const actualizarMascota = (id, mascota) => {
    return apiClient.put(`/api/mascotas/${id}`, mascota)
}

const eliminarMascota = id => {
    return apiClient.delete(`/api/mascotas/${id}`)
}

export default {
    obtenerMascotasByOwner,
    obtenerMascotasById,
    obtenerMascotas,
    guardarMascota,
    actualizarMascota,
    eliminarMascota
}