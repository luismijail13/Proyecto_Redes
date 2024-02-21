const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const { Client } = require('pg');

const app = express();
const port = 3000;

// Configura la conexión a la base de datos
const client = new Client({
  user: 'postgres',
  host: 'localhost',
  database: 'proy_redes',
  password: 'silvestre',
  port: 5432,
});

// Middleware para analizar el cuerpo de las solicitudes
app.use(bodyParser.json());

// Configuración de CORS
app.use(cors());

// Conexión a la base de datos
client.connect()
  .then(() => console.log('Conexión exitosa a la base de datos'))
  .catch(err => console.error('Error al conectar a la base de datos', err));


// Endpoint para agregar un nuevo usuario
app.post('/usuarios', (req, res) => {
  const nuevoUsuario = req.body;
  const query = 'INSERT INTO usuario (dni_usu, prenom_usu, ap_pat_usu, ap_mat_usu, celular_usu, contrasena_usu) VALUES ($1, $2, $3, $4, $5, $6)';
  const values = [nuevoUsuario.dni_usu, nuevoUsuario.prenom_usu, nuevoUsuario.ap_pat_usu, nuevoUsuario.ap_mat_usu, nuevoUsuario.celular_usu, nuevoUsuario.contrasena_usu];
  
  client.query(query, values)
    .then(() => res.send('Usuario agregado correctamente'))
    .catch(err => {
      console.error('Error al agregar usuario', err);
      res.status(500).send('Error al agregar usuario');
    });
});

// Endpoint para agregar un nuevo autor
app.post('/autores', (req, res) => {
  const nuevoAutor = req.body;
  const query = 'INSERT INTO autor (id_autor, prenom_aut, ap_pat_aut, ap_mat_aut, nacion_aut) VALUES ($1, $2, $3, $4, $5)';
  const values = [nuevoAutor.id_autor, nuevoAutor.prenom_aut, nuevoAutor.ap_pat_aut, nuevoAutor.ap_mat_aut, nuevoAutor.nacion_aut];
  
  client.query(query, values)
    .then(() => res.send('Autor agregado correctamente'))
    .catch(err => {
      console.error('Error al agregar autor', err);
      res.status(500).send('Error al agregar autor');
    });
});

// Endpoint para agregar un nuevo libro
app.post('/libros', (req, res) => {
  const nuevoLibro = req.body;
  const query = 'INSERT INTO libro (id_libro, titulo, num_pag, fecha_public) VALUES ($1, $2, $3, $4)';
  const values = [nuevoLibro.id_libro, nuevoLibro.titulo, nuevoLibro.num_pag, nuevoLibro.fecha_public];
  
  client.query(query, values)
    .then(() => res.send('Libro agregado correctamente'))
    .catch(err => {
      console.error('Error al agregar libro', err);
      res.status(500).send('Error al agregar libro');
    });
});


// Endpoint para agregar un nuevo préstamo
app.post('/prestamos', (req, res) => {
  const nuevoPrestamo = req.body;

  // Comprobamos si el libro existe antes de realizar el préstamo
  const checkLibroQuery = 'SELECT * FROM libro WHERE id_libro = $1';
  const libroValues = [nuevoPrestamo.id_libro];

  client.query(checkLibroQuery, libroValues)
    .then(result => {
      if (result.rows.length === 0) {
        return res.status(404).send('El libro especificado no existe.');
      } else {
        // Si el libro existe, procedemos a insertar el préstamo
        const query = 'INSERT INTO prestamo (id_prest, fecha_prest, fecha_devo, dni_usu, id_libro) VALUES ($1, $2, $3, $4, $5)';
        const values = [nuevoPrestamo.id_prest, nuevoPrestamo.fecha_prest, nuevoPrestamo.fecha_devo, nuevoPrestamo.dni_usu, nuevoPrestamo.id_libro];

        client.query(query, values)
          .then(() => res.send('Préstamo agregado correctamente'))
          .catch(err => {
            console.error('Error al agregar préstamo', err);
            res.status(500).send('Error al agregar préstamo');
          });
      }
    })
    .catch(err => {
      console.error('Error al verificar la existencia del libro', err);
      res.status(500).send('Error al verificar la existencia del libro');
    });
});

// Endpoint para consultar prestamos
app.get('/prestamos/:id_prestamo', (req, res) => {
  const idPrestamo = req.params.id_prestamo;

  const query = `
    SELECT p.*, u.*, l.*
    FROM prestamo p
    INNER JOIN usuario u ON p.dni_usu = u.dni_usu
    INNER JOIN libro l ON p.id_libro = l.id_libro
    WHERE p.id_prest = $1
  `;
  const values = [idPrestamo];

  client.query(query, values)
    .then(result => {
      if (result.rows.length === 0) {
        res.status(404).send('No se encontró el préstamo con el ID especificado.');
      } else {
        const prestamoData = result.rows[0];
        res.json(prestamoData);
      }
    })
    .catch(error => {
      console.error('Error al obtener los datos del préstamo:', error);
      res.status(500).send('Error al obtener los datos del préstamo.');
    });
});





// Endpoint para leer todos los usuarios
app.get('/usuarios', (req, res) => {
  client.query('SELECT * FROM usuario')
    .then(result => res.json(result.rows))
    .catch(err => {
      console.error('Error al leer usuarios', err);
      res.status(500).send('Error al leer usuarios');
    });
});


// Endpoint para eliminar un usuario por su dni_usu
app.delete('/usuarios/:dni_usu', (req, res) => {
  const dniUsuario = req.params.dni_usu;
  client.query('DELETE FROM usuario WHERE dni_usu = $1', [dniUsuario])
    .then(() => res.send('Usuario eliminado correctamente'))
    .catch(err => {
      console.error('Error al eliminar usuario', err);
      res.status(500).send('Error al eliminar usuario');
    });
});


// Endpoint para actualizar un usuario por su dni_usu
app.put('/usuarios/:dni_usu', (req, res) => {
  const dniUsuario = req.params.dni_usu;
  const datosUsuario = req.body;
  client.query('UPDATE usuario SET prenom_usu = $1, ap_pat_usu = $2, ap_mat_usu = $3, celular_usu = $4, contrasena_usu = $5 WHERE dni_usu = $6',
    [datosUsuario.prenom_usu, datosUsuario.ap_pat_usu, datosUsuario.ap_mat_usu, datosUsuario.celular_usu, datosUsuario.contrasena_usu, dniUsuario])
    .then(() => res.send('Usuario actualizado correctamente'))
    .catch(err => {
      console.error('Error al actualizar usuario', err);
      res.status(500).send('Error al actualizar usuario');
    });
});


// Endpoint para que el usuario ingrese su DNI y contraseña
app.post('/login', (req, res) => {
  const { dni_usu, contrasena_usu } = req.body;
  client.query('SELECT * FROM usuario WHERE dni_usu = $1 AND contrasena_usu = $2', [dni_usu, contrasena_usu])
    .then(result => {
      if (result.rows.length > 0) {
        // Las credenciales son válidas
        res.json({ mensaje: 'Inicio de sesión exitoso' });
      } else {
        // Las credenciales son inválidas
        res.status(401).json({ mensaje: 'Credenciales incorrectas' });
      }
    })
    .catch(err => {
      console.error('Error al realizar el inicio de sesión', err);
      res.status(500).json({ mensaje: 'Error al realizar el inicio de sesión' });
    });
});

// Iniciar el servidor
app.listen(port, () => {
  console.log(`Servidor en ejecución en http://localhost:${port}`);
});
