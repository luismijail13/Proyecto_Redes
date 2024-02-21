<template>
  <div class='Usuario'>
    <h2>Registro de usuarios</h2>

    <form @submit.prevent="agregarUsuario">
      <label><b>DNI:</b>&nbsp</label><input type='text' v-model='nuevoUsuario.dni_usu' placeholder='DNI' size="10">
      <label><b>Prenombres:</b>&nbsp</label><input type='text' v-model='nuevoUsuario.prenom_usu' placeholder='Prenombres' size="20"><br>
      <label><b>Apellido Paterno:</b>&nbsp</label><input type='text' v-model='nuevoUsuario.ap_pat_usu' placeholder='Apellido Paterno' size="20">
      <label><b>Apellido Materno:</b>&nbsp</label><input type='text' v-model='nuevoUsuario.ap_mat_usu' placeholder='Apellido Materno' size="20"><br>
      <label><b>Celular:</b>&nbsp</label><input type='text' v-model='nuevoUsuario.celular_usu' placeholder='Celular' size="10">
      <label><b>Password:</b>&nbsp</label><input type='password' v-model='nuevoUsuario.contrasena_usu' placeholder='Password' size="15">
      
      <br><br>
      <button type='submit'>Agregar</button>
    </form>

    <br>

  </div>
</template>

<script>
import axios from "axios";

export default {
  data() {
    return {
      nuevoUsuario: {
        dni_usu: '',
        prenom_usu: '',
        ap_pat_usu: '',
        ap_mat_usu: '',
        celular_usu: '',
        contrasena_usu: ''
      },
      backend_server: 'http://localhost:3000' // Cambia la dirección si es necesario
    }
  },
  methods: {
    async agregarUsuario() {
      try {
        const response = await axios.post(`${this.backend_server}/usuarios`, this.nuevoUsuario);
        console.log(response.data);
        alert('Usuario agregado correctamente');
        this.resetForm();
      } catch (error) {
        console.error('Errores al agregar usuario:', error);
        alert('Errores al agregar usuario');
      }
    },
    resetForm() {
      this.nuevoUsuario = {
        dni_usu: '',
        prenom_usu: '',
        ap_pat_usu: '',
        ap_mat_usu: '',
        celular_usu: '',
        contrasena_usu: ''
      };
    }
  }
}
</script>

<style lang="scss">
.cabecera {
  border: 0px solid blue;
  border-radius: 2px;
  text-decoration: underline blue; 
  color: #5632e4; 
  text-align: left;
}

.Usuario {
  border: 3px solid yellow;
  border-radius: 22px;
}

.Usuario h3 {
  text-decoration: underline black;
}
</style>
