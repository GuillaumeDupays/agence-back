const mongoose = require('mongoose');

const ImageSchema = new mongoose.Schema({
    nomImage: String,
    image: String,
});

module.exports = mongoose.model('Image', ImageSchema);
