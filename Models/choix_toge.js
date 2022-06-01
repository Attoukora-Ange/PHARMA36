const mongosse = require("mongoose");
const choixTogeSchema = new mongosse.Schema({
    nom: {
      type: String,
    },
    prenom: {
      type: String,
    },
    long_epaule: {
      type: String,
    },
    long_manche: {
      type: String,
    },
    long_robe: {
      type: String,
    },
  date_choix: {
    type: Date,
    default: Date.now,
  },
});
module.exports = mongosse.model("choix_toge", choixTogeSchema);
