const router = require('express').Router()
const Marca = require('../models/marca')
const Joi = require('@hapi/joi')

const schemaRegisterMarca = Joi.object({
    name: Joi.string().min(3).max(255).required()
})

// getall
router.get('/list', (req, res, next) => {

        let limit = 5;
        let offset = 0 + ((Number(req.query.page) || 1) - 1) * limit;
    
        Marca.find()
            .skip(offset)
            .limit(5)
            .exec(
                (err, marca) => {
    
                    if (err) {
                        return res.status(500).json({
                            ok: false,
                            mensaje: 'Error al cargar marcas',
                            errors: err
                        });
                    }
    
                    Marca.countDocuments((err, conteo) => {
    
                        res.status(200).json({
                            ok: true,
                            rows: marca,
                            count: conteo
                        });
                    });
    
                });
    });

// search
router.get('/find/marca/:marca', async (req, res) => {
    const marcas = await Marca.find();
    res.json(marcas);
    });

// create
router.post('/create', async (req, res) => {

    const { error } = schemaRegisterMarca.validate(req.body)

    if (error) {
        return res.status(400).json(
            { error: error.details[0].message }
        )
    }

    const isMarcaExist = await Marca.findOne({ name: req.body.name });
    if (isMarcaExist) {
        return res.status(400).json(
            {error: 'Marca ya registrado'}
        )
    }


    const marca = new Marca({
        name: req.body.name
    });
    try {
        const savedMarca = await marca.save()
        res.json({
            error: null,
            data: savedMarca
        })
    } catch (error) {
        res.status(400).json({error})
    }
})

// UPDATE
router.put('/update/marca/:id', async (req, res) => {
    const marca = await Marca.findByIdAndUpdate(req.params.id, req.body, { new: true });
    res.json(marca);
    });

// DETELE
router.delete('/delete/marca/:id', async (req, res) => {
    await Marca.findByIdAndDelete(req.params.id);
    res.json({ message: 'Marca deleted' });
    });

module.exports = router