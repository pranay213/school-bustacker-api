const mongoose = require('mongoose');

const locationSchema = new mongoose.Schema({
    bus: { type: mongoose.Schema.Types.ObjectId, ref: 'Bus' },
    latitude: Number,
    longitude: Number,
    updatedAt: { type: Date, default: Date.now }
});

module.exports = mongoose.model('Location', locationSchema);
