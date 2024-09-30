require('dotenv').config();
const express = require('express');
const helmet = require('helmet');
const cors = require('cors');
const mysql = require('mysql2/promise');
const authRoutes = require('./routes/auth');
const profileRoutes = require('./routes/profile');

const app = express();

// Middleware
app.use(express.json());
app.use(helmet());  // Secure HTTP headers
app.use(cors());    // Enable CORS

// MySQL Connection Pool
const db = mysql.createPool({
    host: process.env.DB_HOST,
    user: process.env.DB_USER,
    password: process.env.DB_PASSWORD,
    database: process.env.DB_NAME
});

app.set('db', db);  // Pass database connection to app

// Routes
app.use('/api/auth', authRoutes);
app.use('/api/profile', profileRoutes);  // Add the new profile route

// Start the server
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
