const router = require('express').Router()
//models
const Color = require('../models/color')
const Marca = require('../models/marca')
const Vehiculo = require('../models/vehiculo')

// ==============================
// Busqueda por colección
// ==============================
router.get('/:collecion/find/:busqueda', (req, res) => {var busqueda = req.params.busqueda;
    var tabla = req.params.collecion;
    var regex = new RegExp(busqueda, 'i');

    var promesa;

    switch (tabla) {

        case 'autos':
            promesa = buscarAutos(busqueda, regex);
            break;

        case 'marcas':
            promesa = buscarMarcas(busqueda, regex);
            break;

        case 'colores':
            promesa = buscarColores(busqueda, regex);
            break;

        default:
            return res.status(400).json({
                ok: false,
                mensaje: 'Los tipos de busqueda sólo son: autos, marcas y colores',
                error: { message: 'Tipo de tabla/coleccion no válido' }
            });

    }

    promesa.then(data => {

        res.status(200).json({
            ok: true,
            [tabla]: data
        });

    });

});



function buscarAutos(busqueda, regex) {
    return new Promise((resolve, reject) => {
        Vehiculo.find({
            $or: [
              { identificacion: regex }
            ]
          })
          .populate({
            path: 'marca',
            match: { name: { $regex: busqueda, $options: 'i' } },
            select: 'name'
          })
          .populate({
            path: 'color',
            match: { name: { $regex: busqueda, $options: 'i' } },
            select: 'name'
}).exec((err, autos) => {
          if (err) {
            reject('Error al cargar autos', err);
          } else {
            resolve(autos);
          }
        });
    });
  }


function buscarMarcas(busqueda, regex) {

    return new Promise((resolve, reject) => {

        Marca.find({ name: regex })
            .exec((err, marca) => {

                if (err) {
                    reject('Error al cargar marcas', err);
                } else {
                    resolve(marca);
                }
            });
    });
}

function buscarColores(busqueda, regex) {

    return new Promise((resolve, reject) => {

        Color.find({ name: regex })
            .exec((err, color) => {

                if (err) {
                    reject('Error al cargar autos', err);
                } else {
                    resolve(color);
                }
            });
    });
}

module.exports = router