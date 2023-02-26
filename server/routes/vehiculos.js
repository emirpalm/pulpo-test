const router = require('express').Router()
const Vehiculo = require('../models/vehiculo')
const Joi = require('@hapi/joi');
Joi.objectId = require('joi-objectid')(Joi)

const schemaRegisterVehiculo = Joi.object({
    identificacion: Joi.string().min(17).max(17).required(),
    marca: Joi.objectId(),
    modelo: Joi.number().required(),
    color: Joi.objectId(),
    date: Joi.date().required(),
    estado: Joi.boolean().required(),
    asignado: Joi.boolean().required(),
});

// getall
router.get('/list', (req, res, next) => {

    let limit = 5;
    let offset = 0 + ((Number(req.query.page) || 1) - 1) * limit;

    Vehiculo.find()
        .skip(offset)
        .limit(5)
        .populate({ path: 'marca', select: 'name' })
        .populate({ path: 'color', select: 'name' })
        .exec(
            (err, color) => {

                if (err) {
                    return res.status(500).json({
                        ok: false,
                        mensaje: 'Error al cargar autos',
                        errors: err
                    });
                }

                Vehiculo.countDocuments((err, conteo) => {

                    res.status(200).json({
                        ok: true,
                        rows: color,
                        count: conteo
                    });
                });

            });
});

// search
router.post('/search', async (req, res) => {
    const vehiculos = await Vehiculo.find(
        {
            $or: [
                {identificacion: req.body.identificacion },
                {modelo: req.body.modelo},
                {estado: req.body.estado},
                {asignado: req.body.asignado}
                // ...
            ]
        }
    ).populate({ path: 'marca', select: 'name' }).populate({ path: 'color', select: 'name' });
    res.json(vehiculos);
    });

// REGISTER
router.post('/create', async (req, res) => {

    const { error } = schemaRegisterVehiculo.validate(req.body.data)

    if (error) {
        return res.status(400).json(
            { error: error.details[0].message }
        )
    }

    const isVehiculoExist = await Vehiculo.findOne({ identificacion: req.body.data.identificacion });
    if (isVehiculoExist) {
        return res.status(400).json(
            {error: 'Auto ya registrado'}
        )
    }

    const vehiculo = new Vehiculo({
        identificacion: req.body.data.identificacion,
        marca: req.body.data.marca,
        modelo: req.body.data.modelo,
        color: req.body.data.color,
        date: req.body.data.date,
        estado: req.body.data.estado,
        asignado: req.body.data.asignado
    });
    try {
        const savedVehiculo = await vehiculo.save()
        res.json({
            error: null,
            data: savedVehiculo
        })
    } catch (error) {
        res.status(400).json({error})
    }
})

// UPDATE
router.put('/update/auto/:id', async (req, res) => {
    const vehiculo = await Vehiculo.findByIdAndUpdate(req.params.id, req.body, { new: true });
    res.json(vehiculo);
    });

// DETELE
router.delete('/delete/auto/:id', async (req, res) => {
    await Vehiculo.findByIdAndDelete(req.params.id);
    res.json({ message: 'Auto deleted' });
    });


module.exports = router