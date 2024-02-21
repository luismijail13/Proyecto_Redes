<template>
    <br>
    <div class="cabecera">
        <h2>Registro de Autores</h2><br>
    </div>
      
    <div class='Hospedaje'>
        <form v-on:submit='AgregarAutor'>        
            <label><b>ID Autor:</b></label><input type='text' v-model='newAutor.id_autor' placeHolder='ID del autor' size="20"><br>
            <label><b>Prenombres:</b></label><input type='text' v-model='newAutor.prenom_aut' placeHolder='Prenombres' size="20">
            <label><b>Apellido Paterno:</b></label><input type='text' v-model='newAutor.ap_pat_aut' placeHolder='Apellido Paterno' size="20"><br>
            <label><b>Apellido Materno:</b></label><input type='text' v-model='newAutor.ap_mat_aut' placeHolder='Apellido Materno' size="20">
            <label><b>Nacionalidad:</b></label><input type='text' v-model='newAutor.nacion_aut' placeHolder='Nacionalidad' size="20">
           
            <br>
            <br>

            <button type='submit'>Agregar</button>
        </form> <br>
        <div v-if="mensaje" class="mensaje">{{ mensaje }}</div>
        <br>
    </div>
</template>

<script>
import axios from "axios";

export default {
    data() {
        return {
            newAutor: {},
            backend_server: 'http://127.0.0.1:3000'
        }
    },
    methods: {
        AgregarAutor(e) {
            e.preventDefault();
            axios.post(this.backend_server + '/autores', this.newAutor)
                .then(res => {
                    console.log(res.data);
                    this.mensaje = 'Autor agregado correctamente';
                    // Aquí puedes manejar la respuesta según tus necesidades
                    // Por ejemplo, podrías mostrar un mensaje de éxito o actualizar la lista de autores
                    this.newAutor = {}; // Limpiar el formulario después de agregar el autor
                })
                .catch(error => {
                    console.log(error);
                    this.mensaje = 'Error al agregar autor';
                    // Aquí puedes manejar el error, como mostrar un mensaje de error al usuario
                });
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

.Hospedaje {
    border: 3px solid blue;
    border-radius: 30px;
}

.Hospedaje h3 {
    text-decoration: underline black;
}

.mensaje {
    margin-top: 5px;
    padding: 5px;
    background-color: #f2dede;
    border: 1px solid #ebccd1;
    border-radius: 4px;
    color: #a94442;
}
</style>
