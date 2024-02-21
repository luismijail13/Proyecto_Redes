<template>
    <div class='Libros'>
        <h2>Registro de Libros</h2>
        <form v-on:submit='AgregarLibro'>        
            <label><b>Id del Libro:</b>&nbsp</label>
            <input type='text' v-model='newLibro.id_libro' placeHolder='Id del Libro'><br>
            <label><b>Título:</b>&nbsp</label>
            <input type='text' v-model='newLibro.titulo' placeHolder='Título'><br>
            <label><b>Número de Páginas:</b>&nbsp</label>
            <input type='text' v-model='newLibro.num_pag' placeHolder='Número de Páginas'><br>
            <label><b>Fecha de Publicación:</b>&nbsp</label>
            <input type='text' v-model='newLibro.fecha_public' placeHolder='AAA-MM-DD'><br><br>
            <button type='submit'>Aceptar</button>
        </form> 
        <br>
        
        <br>
        <div v-if="mensaje !== ''">{{ mensaje }}</div>
        <br>
    </div>
</template>

<script>
import axios from "axios";

export default{    
    data(){ 
        return {     
            libros: [],
            newLibro: {},
            backend_server: 'http://127.0.0.1:3000',
            mensaje: ''
        }
    },
    methods:{
        AgregarLibro(e){
            e.preventDefault(); 
            var config_request={'Content-Type': 'application/json','Access-Control-Allow-Origin': '*'}

            axios.post(this.backend_server + '/libros', this.newLibro, { config_request })
            .then(res => {                                         
                this.libros.push(res.data);
                this.newLibro = {};
                this.mensaje = 'Libro agregado correctamente.';
            })
            .catch((error) => {
                console.log(error)
                this.mensaje = 'Error al agregar el libro.';
            });    
            
        },
        deleteLibro(libro){
            var config_request={'Content-Type': 'application/json','Access-Control-Allow-Origin': '*'}

            axios.delete(this.backend_server + '/libro/' + libro._id, {}, { config_request })
            .then(res => {                                         
                this.libros.splice(this.libros.indexOf(libro), 1);
            })
            .catch((error) => {
                console.log(error)
            });  
        }
    },
    created(){                
        axios.get(this.backend_server + "/libro")
        .then(res => {
            this.libros = res.data;
            console.log(this.libros);
        });
    }

}
</script>

<style lang="scss">
.Libros
{
   border: 3px solid brown;
   border-radius: 22px;
}
</style>
