/* eslint-disable indent */
const mongoose = require('mongoose');
const schema = mongoose.Schema;

//keukens
let keukenSchema = new schema({
    keuken: {
        type: String,
        required: true
    }
});

const Keuken = mongoose.model('keuken', keukenSchema);
module.exports = Keuken;
