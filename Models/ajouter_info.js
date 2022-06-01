const mongosse = require("mongoose");
const ajouterInfoSchema = new mongosse.Schema({
    titre_info: {
      type: String,
    },
    auteur_info: {
      type: String,
    },
    description_info: {
      type: String,
    },
  date_publication_info: {
    type: String,
  },
  date: {
    type: Date,
    default: Date.now,
  },
});
module.exports = mongosse.model("information", ajouterInfoSchema);
