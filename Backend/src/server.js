const app = require('./app');
const dotenv = require('dotenv');
const connectDatabase = require('./config/database');

dotenv.config();
connectDatabase(); // Conexão com o Mongo antes de inicializar o servidor

const PORT = process.env.PORT || 3001;

app.listen(PORT, () => {
    console.log('Servidor rodando na porta ' + PORT);
});