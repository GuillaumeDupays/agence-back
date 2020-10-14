const mongoose = require('mongoose');

const ContactSchema = new mongoose.Schema({
    nom: String,
    prenom: String,
    societe: String,
    telephone: Number,
    mail: String,
    objet: String,
    message: String,
    createdOn: { type: Date, default: Date.now }
});

module.exports = mongoose.model('MsgContact', ContactSchema);

