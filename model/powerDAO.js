const mongoose = require('mongoose');
var Schema = mongoose.Schema;

var electricPowerSchema = new Schema({
    address: Number,
    powerConsumption: Number
});

module.exports = mongoose.model('powerConsumption', electricPowerSchema);