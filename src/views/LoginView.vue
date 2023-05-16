<script setup>
import { storeToRefs } from "pinia";
import { useUserStore } from "../stores/user";
</script>

<template>
    <h2>Iniciar sesion</h2>
    
    <form>
        <label>Email:</label>
        <br>
        <input type="email" placeholder="Email addres">
        <br>
        <label>Contraseña:</label>
        <br>
        <input type="password" placeholder="Password">
        <br>
        <button type="submit">Ingresar</button>
    </form>
</template>