<template>
    <div class='precio'>
        <h2>Prestamo de Libros</h2>
        <!-- Formulario para agregar un nuevo préstamo -->
        <form v-on:submit.prevent='AceptarServicio'>        
            <label><b>ID Prestamo:</b>&nbsp</label><input type='text' v-model='newServicio.id_prest' placeHolder='ID Prestamo' size="30"><br>
            <label><b>Fecha de Prestamo:</b>&nbsp</label><input type='text' v-model='newServicio.fecha_prest' placeHolder='Fecha de Prestamo' size="30"><br>
            <label><b>Fecha de Devolucion:</b>&nbsp</label><input type='text' v-model='newServicio.fecha_devo' placeHolder='Fecha de Devolucion' size="30"><br>
            <label><b>DNI del Usuario:</b>&nbsp</label><input type='text' v-model='newServicio.dni_usu' placeHolder='DNI del Usuario' size="30"><br>
            <label><b>ID Libro:</b>&nbsp</label><input type='text' v-model='newServicio.id_libro' placeHolder='ID Libro' size="30"><br>
            <button type='submit'> Agregar </button>
            <br>
            <div v-if="mensajeAgregar !== ''">{{ mensajeAgregar }}</div> <!-- Mensaje para el proceso de agregar préstamo -->
        </form>
        <br>
        <!-- Formulario para buscar un préstamo por su ID -->
        <h2>Buscar Prestamos</h2>
        <form v-on:submit.prevent='BuscarPrestamos'>        
            <label><b>ID Prestamo:</b>&nbsp</label><input type='text' v-model='idPrestamoBusqueda' placeHolder='ID Prestamo' size="20">
            <button type='submit'> Buscar </button>
        </form>
        
        <!-- Tabla para mostrar los datos del prestamo -->
        <table v-if="servicio.length > 0">
            <thead>
                <tr>
                    <th>DNI Usuario</th>
                    <th>Nombre Usuario</th>
                    <th>Apellido Paterno Usuario</th>
                    <th>Apellido Materno Usuario</th>
                    <th>ID Libro</th>
                    <th>Título</th>
                    <th>Fecha de Prestamo</th>
                    <th>Fecha de Devolucion</th>
                </tr>
            </thead>
            <tbody>
                <tr v-for="(prestamo, index) in servicio" :key="index">
                    <td>{{ prestamo.dni_usu }}</td>
                    <td>{{ prestamo.prenom_usu }}</td>
                    <td>{{ prestamo.ap_pat_usu }}</td>
                    <td>{{ prestamo.ap_mat_usu }}</td>
                    <td>{{ prestamo.id_libro }}</td>
                    <td>{{ prestamo.titulo }}</td>
                    <td>{{ prestamo.fecha_prest.split('T')[0] }}</td>
                    <td>{{ prestamo.fecha_devo.split('T')[0] }}</td>
                </tr>
            </tbody>
        </table>
        
        <!-- Mensaje si no se encontró ningún préstamo -->
        <div v-if="mensajeBusqueda !== ''">{{ mensajeBusqueda }}</div> <!-- Mensaje para el proceso de buscar préstamo -->
    </div>
</template>

<script>
import axios from "axios";

export default {
    data() {
        return {
            servicio: [],
            newServicio: {},
            backend_server: 'http://127.0.0.1:3000',
            mensajeAgregar: '', // Mensaje para el proceso de agregar préstamo
            idPrestamoBusqueda: '',
            mensajeBusqueda: '' // Mensaje para el proceso de buscar préstamo
        }
    },
    methods: {
        AceptarServicio() {
    var config_request = { 'Content-Type': 'application/json', 'Access-Control-Allow-Origin': '*' };

    axios.post(this.backend_server + '/prestamos', this.newServicio, { config_request })
        .then(res => {
            this.servicio.push(res.data);
            this.newServicio = {};
            this.mensajeAgregar = 'El préstamo se procesó correctamente.'; // Mensaje de éxito al agregar préstamo
        })
        .catch((error) => {
            console.log(error);
            this.mensajeError = 'Error al procesar el préstamo.'; // Mensaje de error al agregar préstamo
        })
        .finally(() => {
            this.mensajeBusqueda = ''; // Limpiar mensaje de búsqueda para evitar su aparición simultánea
        });
},

BuscarPrestamos() {
    if (!this.idPrestamoBusqueda) {
        this.mensajeBusqueda = 'Por favor ingrese un ID de préstamo válido.'; // Mensaje de error si no se ingresa un ID válido
        return;
    }

    var config_request = { 'Content-Type': 'application/json', 'Access-Control-Allow-Origin': '*' };

    axios.get(`${this.backend_server}/prestamos/${this.idPrestamoBusqueda}`, { config_request })
        .then(res => {
            this.servicio = [res.data];
            this.mensajeBusqueda = ''; // Limpiar mensaje de búsqueda si se encontró el préstamo
        })
        .catch(error => {
            console.log(error);
            this.servicio = [];
            this.mensajeBusqueda = 'No se encontró ningún préstamo con el ID especificado.'; // Mensaje si no se encuentra el préstamo
        })
        .finally(() => {
            this.mensajeAgregar = ''; // Limpiar mensaje de agregar préstamo para evitar su aparición simultánea
        });
}
    },
    created() {
        // Aquí podrías realizar alguna carga inicial de prestamos al cargar el componente
    }
}
</script>

<style lang="scss">
.precio {
    border: 3px solid brown;
    border-radius: 22px;
}

.precio h2 {
    text-decoration: underline;
}

table {
    border-collapse: collapse;
    width: 100%;
}

th, td {
    border: 1px solid #dddddd;
    text-align: left;
    padding: 8px;
}

th {
    background-color: #f2f2f2;
}
</style>
