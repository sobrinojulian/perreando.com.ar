import { defineStore } from "pinia"

export const usePaseadorStore = defineStore("paseador", {
    state: () => {
        return {
            paseador: {
                paseadorId: "",
                nombre: "",
                apellido: "",
                dni: "",
                email: "",
                telefono: "",
                zona: "",
                horario: "",
                precio: "",
                disponibilidadId: ""
            }
        }
    }
})