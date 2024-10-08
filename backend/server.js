require('dotenv').config()
const express = require('express')
const cors = require('cors')
const path = require('path')
const logger = require('./services/logger.service')
// const socketService = require('./services/socket.service')

// Routes import
const contactRoutes = require('./api/contact/contact.routes')
const userRoutes = require('./api/user/user.routes')

const app = express()
const http = require('http').createServer(app)

app.use(express.json())
app.use(express.urlencoded({ extended: false }))

// Serve static files from 'dist' in production
if (process.env.NODE_ENV === 'production') {
    app.use(express.static(path.join(__dirname, 'public')))
} else {
    const corsOptions = {
        origin: [
            'https://mister-bitcoin-7pqz.onrender.com',
            'http://127.0.0.1:3000',
            'http://localhost:3000',
            'http://127.0.0.1:4200',
            'http://localhost:4200'
        ],
        credentials: true
    }
    app.use(cors(corsOptions))
}

// socketService.init(http, corsOptions);

//Routes
app.use('/api/contact', contactRoutes)
app.use('/api/user', userRoutes)

// Serve index.html for all other routes
app.get('*', (req, res) => {
    res.sendFile(path.join(__dirname, 'public/index.html'));
})

const port = process.env.PORT || 3000;
http.listen(port, () => {
    logger.info('Server is running on port: ' + port)
})

// error handling middleware**
app.use((err, req, res, next) => {
    console.error(err.stack)
    res.status(500).send('Something broke!')
})
