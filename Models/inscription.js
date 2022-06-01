const mongosse = require("mongoose");
const userSchema = new mongosse.Schema({
  photo_profil: {
    type: String,
  },
  nom: {
    type: String,
  },
  prenom: {
    type: String,
  },
  date_naissance: {
    type: String,
  },
  domicile: {
    type: String,
  },
  telephone: {
    type: String,
  },
  email: {
    type: String,
  },
  lieu_exercice: {
    type: String,
  },
  contact_parent: {
    type: String,
  },
  reseau_social: {
    type: String,
  },
  identifiant_reseau: {
    type: String,
  },
  status_promotion: {
    type: String,
  },
  soutenue: {
    type: Boolean,
  },
  date_soutenance: {
    type: String,
  },
  departement: {
    type: String,
  },
  directeur: {
    type: String,
  },
  titre_sujet: {
    type: String,
  },
  resume: {
    type: String,
  },
  fichier_pdf: {
    type: String,
  },
  password: {
    type: String,
  },
  date_inscription: {
    type: Date,
    default: Date.now,
  },
});
module.exports = mongosse.model("user", userSchema);
