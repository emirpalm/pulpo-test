const router = require('express').Router()
const User = require('../models/user')
const Joi = require('@hapi/joi')
const bcrypt = require('bcryptjs')
const jwt = require('jsonwebtoken')

const schemaRegister = Joi.object({
    name: Joi.string().min(6).max(255).required(),
    email: Joi.string().min(6).max(255).required().email(),
    password: Joi.string().min(6).max(1024).required(),
    password2: Joi.string().min(6).max(1024).required(),
    terminos: Joi.boolean().required()
})

// Esquema del login
const schemaLogin = Joi.object({
    email: Joi.string().min(6).max(255).required().email(),
    password: Joi.string().min(6).max(1024).required(),
    remember: Joi.boolean().required()
})

// LOGIN
router.post('/login', async (req, res) => {
    // Validaciones de login
    const { error } = schemaLogin.validate(req.body)
    if(error) return res.status(400).json(
        {
            ok: false,
            msg: error.details[0].message,
            errors: err
        })
    
    // Validaciond e existencia
    const user = await User.findOne({email: req.body.email})
    if(!user) return res.status(400).json({
        ok: false,
        msg: 'Usuario no encontrado'
    })

    // Validacion de password en la base de datos
    const validPassword = await bcrypt.compare(req.body.password, user.password)
    if(!validPassword) return res.status(400).json({
        ok: false,
        msg: 'Contraseña invalida'
    })

    // Creando token
    const token = jwt.sign({
        name: user.name,
        id: user._id
    }, process.env.TOKEN_SECRET)
    
    // Colocando el token en el header y el cuerpo de la respuesta
    res.header('auth-token', token).json({
        ok: true,
        data: { token },
        msg: 'Bienvenido'
    })
})


// REGISTER
router.post('/register', async (req, res) => {

    const { error } = schemaRegister.validate(req.body)

    if (error) {
        return res.status(400).json(
            {
                ok: false,
                msg: error.details[0].message,
                errors: err
            }
        )
    }

    const isEmailExist = await User.findOne({ email: req.body.email });
    if (isEmailExist) {
        return res.status(400).json(
            {
                ok: false,
                msg: 'Email ya registrado'
            }
        )
    }

    const salt = await bcrypt.genSalt(10)
    const password = await bcrypt.hash(req.body.password, salt)

    const user = new User({
        name: req.body.name,
        email: req.body.email,
        password: password
    });
    try {
        const savedUser = await user.save()
        res.json({
            ok: true,
            data: savedUser
        })
    } catch (error) {
        res.status(400).json({error})
    }
})

module.exports = router