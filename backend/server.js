const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const authRoutes = require('./routes/authRoutes'); // Import authRoutes

const app = express();
const port = 5000;

// Middleware
app.use(bodyParser.json());
app.use(cors());

// Use authRoutes for all authentication-related endpoints
app.use('/auth', authRoutes);

// Start server
app.listen(port, () => {
  console.log(`Server running on http://localhost:${port}`);
});
