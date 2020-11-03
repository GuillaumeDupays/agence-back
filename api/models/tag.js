const mongoose = require('mongoose');

const TagSchema = new mongoose.Schema({
   nom: String,
});

module.exports = mongoose.model('Tag', TagSchema);
