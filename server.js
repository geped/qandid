// server.js
require('dotenv').config(); // Carica le variabili d'ambiente
const express = require('express');
const bodyParser = require('body-parser');
const path = require('path');
const cvRoutes = require('./src/routes/cvRoutes');

const app = express();
const PORT = process.env.PORT || 3000;

// Configurazione EJS (Motore grafico)
app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, 'views'));

// Middleware per leggere i dati dei form
app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.static(path.join(__dirname, 'public'))); // Cartella per CSS

// Uso delle rotte
app.use('/', cvRoutes);

// Avvio del server
app.listen(PORT, () => {
    console.log(`Server attivo su http://localhost:${PORT}`);
});