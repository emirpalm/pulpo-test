const express = require('express')
const authRoutes = require('./routes/auth.js')
const mongoose = require('mongoose')
const vehiculosRoutes = require('./routes/vehiculos')
const marcasRoutes = require('./routes/marcas')
const coloresRoutes = require('./routes/colores')
const busquedasRoutes = require('./routes/busquedas')
const middleware = require('./routes/middleware')
const cors = require('cors')
require('dotenv').config()

//const express = require('express');
///const mongoose = require('mongoose');
mongoose.connect('mongodb://database/myapp', { useNewUrlParser: true });

var corsOptions = {
    origin: '*', // Aqui debemos reemplazar el * por el dominio del cliente
    optionsSuccessStatus: 200 // Es necesario para navegadores antiguos o algunos SmartTVs
  }


  const app = express()

  app.use(cors(corsOptions));
  
  app.use(express.json());
  app.use(express.urlencoded({ extended: false }));
  
  app.use('/api/user', authRoutes)
  app.use('/api/autos', middleware, vehiculosRoutes)
  app.use('/api/marcas', middleware, marcasRoutes)
  app.use('/api/colores', middleware, coloresRoutes)
  app.use('/api', middleware, busquedasRoutes)
  
  app.get('/', (req, res) => {
    res.json({ mensaje: 'My Auth Api Rest' })
  })
  
  const PORT = process.env.PORT || 3000
app.listen(PORT, () => {
    console.log(`Tu servidor está corriendo en el puerto: ${PORT}`)
})
