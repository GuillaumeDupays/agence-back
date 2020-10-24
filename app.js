const express = require('express');
const app = express();
const api = require('./api/v1/index');
const bodyParser = require('body-parser');
const cors = require('cors');

const mongoose = require('mongoose');
const connection = mongoose.connection;

app.set('port', (process.env.port || 3000));

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cors({credentials: true, origin: 'http://blob-zone.com'}));
app.use('/api/v1', api); //localhost:3000/api/v1

app.use((req, res) => {
    const err = new Error('404 - Non trouvé...');
    err.status = 500;
    res.json(err);
});

mongoose.connect('mongodb://localhost:27017/msg-contacts', { useUnifiedTopology: true, useNewUrlParser: true });

connection.on('error', (err) => {
    console.error(`Erreur de connexion vers MongoDb, error: ${err.message}`);
});

connection.once('open', () => {
    console.log('Connecté à MongoDb');
        
    app.listen(app.get('port'), () => {
        console.log(`Ecoute le port ${app.get('port')}`);
        });
});
