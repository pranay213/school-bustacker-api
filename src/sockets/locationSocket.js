const Location = require('../models/locationModel');

const setupSocket = (io) => {
    io.on('connection', (socket) => {
        console.log('Driver connected:', socket.id);

        socket.on('locationUpdate', async (data) => {
            const { busId, latitude, longitude } = data;

            await Location.findOneAndUpdate(
                { bus: busId },
                { latitude, longitude, updatedAt: Date.now() },
                { new: true, upsert: true }
            );

            io.emit('busLocation', { busId, latitude, longitude }); // Broadcast to all parents
        });

        socket.on('disconnect', () => {
            console.log('Driver disconnected:', socket.id);
        });
    });
};

module.exports = { setupSocket };
