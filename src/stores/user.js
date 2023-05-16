import { defineStore } from "pinia";

export const useUserStore = defineStore("user", {
    state: () => {
        return {
            user: {
                email: "", //Nombre de usuario (EMAIL)
                password: ""
            }
        }
    },
    actions: {
        cambiarEmail(user){
            this.user.email = user.email
        }
    }
});