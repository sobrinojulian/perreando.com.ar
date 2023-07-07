import { defineStore } from "pinia";

export const useUserStore = defineStore("user", {
  state: () => {
    return {
      user: {
        id: "",
        username: "",
        email: "",
        password: "",
        nombre: "",
        apellido: "",
        dni: "",
        fechaNacimiento: "",
        telefono: "",
        direccion: "",
        role: "",
        saldo: 0,
      },
    };
  },
  actions: {
    updateUser(user) {
      this.user = user;
    },
  },
});
