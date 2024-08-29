const express = require('express');
const cors = require('cors');
const logger = require('./services/logger.service');
const socketService = require('./services/socket.service');
require('dotenv').config(); // Load environment variables from .env

// Import the routes
const contactRoutes = require('./api/contact/contact.routes');
const userRoutes = require('./api/user/user.routes');

const app = express();
const http = require('http').createServer(app);

app.use(express.json());
app.use(express.urlencoded({ extended: false }));
console.log("Server")
const corsOptions = {
    origin: ['http://127.0.0.1:3001', 'http://localhost:3001', 'http://127.0.0.1:4200', 'http://localhost:4200'],
    credentials: true
};
app.use(cors(corsOptions));

// socketService.init(http, corsOptions);

// Use the routes
app.use('/api/contact', contactRoutes);
app.use('/api/user', userRoutes);

const port = process.env.PORT || 3000;
http.listen(port, () => {
    logger.info('Server is running on port: ' + port);
});
