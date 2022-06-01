const mongosse = require("mongoose");
const ajouterBureauSchema = new mongosse.Schema({
    nom_bureau: {
      type: String,
    },
    titre_bureau: {
      type: String,
    },
    bureau_photo: {
      type: String,
    },
  date_choix: {
    type: Date,
    default: Date.now,
  },
});
module.exports = mongosse.model("membre_bureau", ajouterBureauSchema);
