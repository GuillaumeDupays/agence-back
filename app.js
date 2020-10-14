const express = require('express');
const app = express();

const PORT = 3000;

app.get('/', (req, res) => {
    res.send('Hello');
});

app.get('/contacts', (req, res) => {
  res.send('Les contacts')
});

app.get('/contacts/add', (req, res) => {
    res.send('Formulaire d\'ajout')
});

app.get('/contacts/:id', (req, res) => {
    const id = req.params.id;
    res.send(`contact numéro ${id}`);
});

app.listen(PORT, () => {
   console.log(`écoute le port ${PORT}`);
});
