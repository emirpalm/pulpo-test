const mongoose = require('mongoose')

const colorSchema = mongoose.Schema({
    name: {
        type: String,
        require: true,
        min: 3,
        max: 255
    },
    date: {
        type: Date,
        default: Date.now
    }
})

module.exports = mongoose.model('Color', colorSchema)