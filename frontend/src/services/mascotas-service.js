
import axios from "axios";
import config from "./config";

class MascotasService {

  static async getAll() {
    try {
      const mascotas = await axios.get(`${config.backend.host}/api/${config.backend.apiVersion}/mascotas`, {
        headers: {
          "content-type": "application/json"
        }
      });
      alert(mascotas)
      return mascotas.data;
    } catch (err) {
      console.log(err);
      return err;
    }
  }

  static async get(id) {  
    try {
      const mascotas = await axios.get(`${config.backend.host}/api/${config.backend.apiVersion}/mascotas/${id}`, {
        headers: {
          "content-type": "application/json"
        }
      });
      return mascotas.data;
    } catch (err) {
      console.log(err);
      return err;
    }
  }

  static async create(mascotaData) {
    try {
      const mascotas = await axios.post(`${config.backend.host}/api/${config.backend.apiVersion}/mascotas`, mascotaData,
        {
          headers: {
            "Content-Type": "application/json"
          }
        });
      return mascotas.data;
    } catch (err) {
      console.log(err);
      return err;
    }
  }

  static async update(mascotaData) {
    try {
      const mascotas = await axios.put(`${config.backend.host}/api/${config.backend.apiVersion}/mascotas`, mascotaData,
        {
          headers: {
            "content-type": "application/json"
          }
        });
      return mascotas.data;
    } catch (err) {
      console.log(err);
      return err;
    }
  }
}

export default MascotasService;
