const Location = require('../models/locationModel');

exports.updateLocation = async (req, res) => {
    const { busId, latitude, longitude } = req.body;

    const location = await Location.findOneAndUpdate(
        { bus: busId },
        { latitude, longitude, updatedAt: Date.now() },
        { new: true, upsert: true }
    );

    res.status(200).json(location);
};

exports.getBusLocation = async (req, res) => {
    const { busId } = req.params;

    const location = await Location.findOne({ bus: busId });

    res.status(200).json(location);
};
