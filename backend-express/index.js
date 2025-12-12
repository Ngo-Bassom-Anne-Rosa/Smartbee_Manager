// /backend-express/index.js

const express = require('express');
const { Pool } = require('pg'); // Le driver PostgreSQL
const cors = require('cors');    // Pour la communication avec Angular
require('dotenv').config();      // Pour charger les variables du .env

// 2. INITIALISATION DE L'APPLICATION
const app = express();
const PORT = process.env.PORT || 3000;

// 3. MIDDLEWARES
// Pour gérer les requêtes JSON (crucial pour POST, PUT)
app.use(express.json());
// Configuration CORS pour autoriser Angular (http://localhost:4200)
app.use(cors({
    origin: 'http://localhost:4200'
}));

// 4. CONFIGURATION DE LA CONNEXION DB (Pool de connexions)
const pool = new Pool({
    user: process.env.DB_USER,
    host: process.env.DB_HOST,
    database: process.env.DB_NAME,
    password: process.env.DB_PASSWORD,
    port: process.env.DB_PORT,
    // Max 20 connexions simultanées, pour la performance
    max: 20,
    idleTimeoutMillis: 30000
});

// TESTER LA CONNEXION À LA BASE DE DONNÉES
pool.connect()
    .then(client => {
        console.log(' Connexion à PostgreSQL réussie!');
        client.release(); // Libérer le client après le test
    })
    .catch(err => {
        console.error(' ERREUR DE CONNEXION DB:', err.stack);
        process.exit(1); // Arrêter l'application si la DB est injoignable
    });


// 5. ROUTE DE TEST (Pour vérifier que le serveur Express fonctionne)
app.get('/', (req, res) => {
    res.status(200).send('API SmartHive Manager : Serveur ExpressJS en marche.');
});


// 6. DÉMARRAGE DU SERVEUR
app.listen(PORT, () => {
    console.log(`Serveur Express démarré sur le port ${PORT}`);
});