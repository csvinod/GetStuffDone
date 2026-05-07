const dotenv = require('dotenv');
dotenv.config();

const express = require('express');
const cors = require('cors');

// Routes
const appRoutes = require('./main/interface/routes/appRoutes');
const authRoutes = require('./main/interface/routes/authRoutes');
const custRoutes = require('./main/interface/routes/custRoutes');

// Application Services
const AuthService = require('./main/utilities/auth/simpleOtpService');

const SERVER_PORT = 8080;

// Globals
global.authService = new AuthService(); // this needs to be a singleton, available across modules


// App initialization
const app = express();
app.use(cors())
app.use(express.json())
app.use(express.urlencoded({ extended: true }));

console.log(app)


// Mount Routes
app.use('/auth', authRoutes);
app.use('/cust', custRoutes);
app.use('/', appRoutes);
console.log("Routes added")

// Start server
app.listen(SERVER_PORT, () => {
      console.log(`server listening on port ${SERVER_PORT}`)
})
