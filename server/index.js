const express = require('express');
const cors = require('cors');

const app = express();
const PORT = 5000;

// Middleware
app.use(cors());
app.use(express.json());

// Routes
app.get('/', (req, res) => {
    res.send('Hello from the backend!');
});

// API Endpoint exemple
app.get('/api/data', (req, res) => {
    res.json({ message: 'Hello from API!', data: [1, 2, 3] });
});

// Lancer le serveur
app.listen(PORT, () => {
    console.log(`Server running on http://localhost:${PORT}`);
});
