const mongosse = require("mongoose");
const choixTailleSchema = new mongosse.Schema({
    nom: {
      type: String,
    },
    prenom: {
      type: String,
    },
    choix: {
      type: String,
    },
  date_choix: {
    type: Date,
    default: Date.now,
  },
});
module.exports = mongosse.model("choixTaille", choixTailleSchema);
