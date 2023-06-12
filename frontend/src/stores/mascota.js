import { defineStore } from "pinia"

export const useMascotaStore = defineStore("mascota", {
    state: () => {
        return {
            mascota: {
                id: "",
                nombre: "",
                vacunado: "",
                tamanio: "",
                raza: "",
                peso: "",
                ownerId: ""
            }
        }
    }
})