const mongosse = require("mongoose");
const archive_cotisationSchema = new mongosse.Schema({
  identifiant_utilisateur: {
    type: String,
  },
  nom_membre:{
    type: String,
  },
  prenom_membre:{
    type: String,
  },
    type_cotisation: {
      type: String,
    },
    montant_cotisation: {
      type: String,
    },
    type_payement_cotisation: {
      type: String,
    },
    nom_tresoriere_cotisation: {
      type: String,
    },
    numero_tresoriere_cotisation: {
      type: String,
    },
  date_payement_cotisation: {
    type: String,
  },
});
module.exports = mongosse.model("archive_cotisation", archive_cotisationSchema);
