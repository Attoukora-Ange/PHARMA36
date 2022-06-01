const mongosse = require("mongoose");
const ajouterEveSchema = new mongosse.Schema({
    photo_evenement: {
      type: String,
    },
  date_choix: {
    type: Date,
    default: Date.now,
  },
});
module.exports = mongosse.model("image_en_slade", ajouterEveSchema);
