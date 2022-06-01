const mongosse = require("mongoose");
const ajouterEveSchema = new mongosse.Schema({
    type_evenement: {
      type: String,
    },
    date_evenement: {
      type: String,
    },
    photo_evenement: {
      type: String,
    },
    description_evenement: {
      type: String,
    },
  date_choix: {
    type: Date,
    default: Date.now,
  },
});
module.exports = mongosse.model("evenement", ajouterEveSchema);
