const mongoose = require('mongoose')

const vehiculoSchema = mongoose.Schema({
    identificacion: {
        type: String,
        require: true,
        max: 17
    },
    marca: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Marca'
    },
    modelo: {
        type: Number,
        require: true
    },
    color: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Color'
    },
    date: {
        type: Date,
        default: Date.now
    },
    estado: {
        type: Boolean,
        default: true
    },
    asignado: {
        type: Boolean,
        default: false
    }
})

module.exports = mongoose.model('Vehiculo', vehiculoSchema)