const mongoose = require('mongoose');

const TagSchema = new mongoose.Schema({
   tagNom: String,
});

module.exports = mongoose.model('Tag', TagSchema);
