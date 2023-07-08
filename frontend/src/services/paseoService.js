import axiosClient from "./axiosClient.js";
const apiClient = axiosClient.getApiClient();

const grabarPaseo = (paseo) => {
  return apiClient.post("/api/paseos", paseo);
};

const obtenerPaseosProgramados = (role, id) => {
  return apiClient.get(`/api/paseos/programados/${role}/${id}`);
};

const obtenerPaseosHistorial = (role, id) => {
  return apiClient.get(`/api/paseos/historial/${role}/${id}`);
};

const calificar = (id, calificacion) => {
  return apiClient.post(`/api/paseos/calificar/${id}`, { calificacion });
};

export default {
  grabarPaseo,
  obtenerPaseosProgramados,
  obtenerPaseosHistorial,
  calificar
};
