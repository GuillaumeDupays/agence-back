const mongoose = require('mongoose');

const ArticleContenuSchema = mongoose.Schema({
    titreContenu: String,
    imageContenu: String,
    texteContenu: String,
});

module.exports = mongoose.model('ArticleContenu', ArticleContenuSchema);
