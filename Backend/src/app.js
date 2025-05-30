const express = require('express');
const cors = require('cors');
const userRoutes = require('./routes/user.routes');

const app = express();

app.use(cors());
app.use(express.json());

// Rotas
app.use('/users', userRoutes);

app.get('/', (req, res) => {
    res.send('API funcionando!');
});

module.exports = app;