import axiosClient from "./axiosClient.js";
const apiClient = axiosClient.getApiClient();

const loginUser = (username, password) => {
  console.log(username);
  console.log(password);
  return apiClient.get(`/api/users/login/${username}/${password}`);
};

const registerUser = (user) => {
  console.log(user);
  return apiClient.post(`/api/users/register`, user);
};

const editUser = (id, user) => {
  console.log(id);
  console.log(user);
  return apiClient.put(`/api/users/edit/${id}`, user);
};

const deleteUser = (id) => {
  console.log(id);
  return apiClient.delete(`/api/users/delete/${id}`);
};

export default {
  loginUser,
  registerUser,
  editUser,
  deleteUser,
};
