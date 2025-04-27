const express = require('express');
const mongoose = require('mongoose');
const dotenv = require('dotenv');
const cors = require('cors');
const { Server } = require('socket.io');
const http = require('http');
const morgan = require('morgan');


dotenv.config();


const authRoutes = require('./routes/authRoutes');
const locationRoutes = require('./routes/locationRoutes');
const { setupSocket } = require('./sockets/locationSocket');

const app = express();
app.use(cors());
app.use(express.json());
app.use(morgan('dev'));

const server = http.createServer(app);
const io = new Server(server, {
    cors: {
        origin: "*"
    }
});

setupSocket(io); // setup real-time connection

app.use(cors());
app.use(express.json());

// Routes
app.use('/api/auth', authRoutes);
app.use('/api/location', locationRoutes);

// MongoDB Connection
mongoose.connect(process.env.MONGO_URI)
    .then(() => console.log('MongoDB Connected'))
    .catch((err) => console.log(err));

// Server
const PORT = process.env.PORT || 5000;
server.listen(PORT, () => console.log(`Server running on port http://localhost:${PORT}`));
