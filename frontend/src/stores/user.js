import { defineStore } from "pinia"

export const useUserStore = defineStore("user", {
    state: () => {
        return {
            user: {
                username: "",
                email: "",
                password: "",
                nombre: "",
                apellido: "",
                dni: "",
                fechaNacimiento: "",
                telefono: "",
                role: "",
                saldo: 0
            }
        }
    },
    actions: {
        updateUser(user){
            console.log('user:', user)
            this.user = user
        }
    }
})