const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const AuteurSchema = new Schema({
   nomAuteur: String,
/*   articles: [{
      type: Schema.Types.ObjectId,
      ref: "Article"
   }]*/
});

module.exports = mongoose.model('Auteur', AuteurSchema);
