const express = require('express');
const app = express();
const api = require('./api/v1/index');
const apiArticle = require('./api/v1/article');
const apiTag = require('./api/v1/tag');
const bodyParser = require('body-parser');
const cors = require('cors');

const mongoose = require('mongoose');
const connection = mongoose.connection;

const prod = 'http://blob-zone.com';
const test = 'http://localhost:4200';

app.set('port', (process.env.port || 3000 ));

/*app.use((req, res, next) => {
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.setHeader('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content, Accept, Content-Type, Authorization');
    res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, PATCH, OPTIONS');
    next();
});*/

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cors({credentials: true, origin: `${test}`}));

const uploadsDir = require('path').join(__dirname, '/uploads');
console.log('uploadsDir', uploadsDir);
app.use(express.static(uploadsDir));

app.use('/api/v1', api, apiArticle, apiTag ); //localhost:3000/api/v1

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
