const router = require('express').Router()
const Color = require('../models/color')
const Joi = require('@hapi/joi')

const schemaRegisterColor = Joi.object({
    name: Joi.string().min(3).max(255).required()
})

// getall
router.get('/list', (req, res, next) => {

    let limit = 5;
    let offset = 0 + ((Number(req.query.page) || 1) - 1) * limit;

    Color.find()
        .skip(offset)
        .limit(5)
        .exec(
            (err, color) => {

                if (err) {
                    return res.status(500).json({
                        ok: false,
                        mensaje: 'Error al cargar colores',
                        errors: err
                    });
                }

                Color.countDocuments((err, conteo) => {

                    res.status(200).json({
                        ok: true,
                        rows: color,
                        count: conteo
                    });
                });

            });
});

// REGISTER
router.post('/create', async (req, res) => {

    const { error } = schemaRegisterColor.validate(req.body)

    if (error) {
        return res.status(400).json(
            { error: error.details[0].message }
        )
    }

    const isColorExist = await Color.findOne({ name: req.body.name });
    if (isColorExist) {
        return res.status(400).json(
            {error: 'Color ya registrado'}
        )
    }


    const color = new Color({
        name: req.body.name
    });
    try {
        const savedColor = await color.save()
        res.json({
            error: null,
            data: savedColor
        })
    } catch (error) {
        res.status(400).json({error})
    }
})

// UPDATE
router.put('/update/color/:id', async (req, res) => {
    const color = await Color.findByIdAndUpdate(req.params.id, req.body, { new: true });
    res.json(color);
    });

// DETELE
router.delete('/delete/color/:id', async (req, res) => {
    await Color.findByIdAndDelete(req.params.id);
    res.json({ message: 'Color deleted' });
    });

module.exports = router