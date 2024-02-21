<template>
  <h1>Biblioteca "BIBLIOTECA"</h1>
    <div class="header">
       <h3 class="header_titulo"><img src="C:\Users\luism\maestria2\Redes\PRUEBA\icono.png" alt="Descanso" width="160" height="100"></h3>
          <ul class="header_lista">
            <li class="header_lista_item">
                <a 
                  @click="VerComponente(Minicio)" 
                  class="header_lista_item_link">
                  Inicio
                </a>
            </li>
        <li class="header_lista_item">
          <a 
            @click="VerComponente(Rusuario)"
            class="header_lista_item_link">
            Usuarios
            </a>
        </li>
        <li class="header_lista_item">
          <a 
             @click="VerComponente(Rcliente)"
            class="header_lista_item_link">
            Libros
            </a>
        </li>
         <li class="header_lista_item">
          <a 
            @click="VerComponente(Rreserva)"
            class="header_lista_item_item_link">
            Autor
            </a>
        </li>
         <li class="header_lista_item">
          <a 
            @click="VerComponente(Rpago)"
            class="header_lista_item_item_link">
            Prestamo
            </a>
        </li>
         <li class="header_lista_item">
          <a 
            
            class="header_lista_item_item_link">
            
            </a>
        </li>
      </ul>
      
        </div>
      <div>
      
      <component :is="componentSelect"/>
     </div>  
     
     
    </template>

<script>
import inicio from './components/inicio.vue'
import Usuario from './components/Usuario.vue'
import Libro from './components/Libro.vue'
import Autor from './components/Autor.vue'
import Prestamo from './components/Prestamo.vue'
export default {
name:'App',
data(){
  return {
     Minicio: inicio,
     Rusuario: Usuario,
     Rcliente: Libro,
     Rreserva: Autor,
     Rpago: Prestamo,
    
    componentSelect:null
  }
},
components: {
  Usuario,
  Libro,
  Autor,
  Prestamo,
  inicio
  },
methods: {
VerComponente: function(componente) {
  this.componentSelect=componente
    }
  }
}
</script>

<style lang="scss">

* {
  margin:0px;
  padding:0px;
  }
.header
  {
    padding: 1em;
    border:5px solid green;
     border-radius:30px;
    display:flex;
    justify-content:space-between;
    align-items:center;
    
    &_lista {
      display:flex;
      list-style:none;
      padding:0px;
      margin:0px;
    
    &_item{
      padding: 1em;
      }
    }

  }

</style>
