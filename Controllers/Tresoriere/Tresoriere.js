const DATA_BASE_TRESORERIE = require('../../Models/cotisation');
const DATA_BASE_ARCHIVE = require('../../Models/archive_cotisation');
// ***********GET*****************
module.exports.getPayement_attente = async (req, res) => {
    const UTILISATEUR_CONNECTE = req.user;
    const PAYEMENT_ATTENTES = await DATA_BASE_TRESORERIE.find();

    const indexOption = { titre_page: "Payement en attente", UTILISATEUR_CONNECTE, PAYEMENT_ATTENTES};

    res.render('tresoriere/payement_attente', indexOption)
}
module.exports.getArchive_payement = async (req, res) => {
  const UTILISATEUR_CONNECTE = req.user;
  const ARCHIVAGE_PAYEMENTS = await DATA_BASE_ARCHIVE.find();
  

  const indexOption = { titre_page: "Archive payement", UTILISATEUR_CONNECTE, ARCHIVAGE_PAYEMENTS};
  res.render("tresoriere/archive_payement", indexOption);
}
// *************POST*******************
module.exports.postArchive_payement =  (req, res) => {
    
    res.send('ok')
    // res.render('tresoriere/archive_payement', {titre_page: 'Archive payement'})
}
module.exports.postPayement_attente =  async (req, res) => {
    const {id} = req.body;
    const DONNEE_TABLEAU = await DATA_BASE_TRESORERIE.findById(id);
    const {identifiant_utilisateur, nom_membre, prenom_membre, type_cotisation, montant_cotisation, type_payement_cotisation, nom_tresoriere_cotisation, numero_tresoriere_cotisation, date_payement_cotisation } = DONNEE_TABLEAU;
    const NEW_ARCHIVE = DATA_BASE_ARCHIVE({
        identifiant_utilisateur,nom_membre, prenom_membre, type_cotisation, montant_cotisation, type_payement_cotisation, nom_tresoriere_cotisation, numero_tresoriere_cotisation, date_payement_cotisation
    })
    NEW_ARCHIVE.save((e) => {
        if (e)
          return console.log(
            "ERREUR AU COURS DE L'ARCHIVAGE"
          );
        console.log("VALIDATION DU PAYEMENT DE LA COTISATION A REUSSI");
      });
      await DATA_BASE_TRESORERIE.findByIdAndDelete(id);
      res.redirect("/tresoriere/cotisation_attente");
}
module.exports.postSupprimer_cotisation_attente =  async (req, res) => {
    const {id} = req.body;
      await DATA_BASE_TRESORERIE.findByIdAndDelete(id);
      res.redirect("/tresoriere/cotisation_attente");
}
module.exports.postSupprimer_cotisation_archive =  async (req, res) => {
    const {id} = req.body;
      await DATA_BASE_ARCHIVE.findByIdAndDelete(id);
      res.redirect("/tresoriere/archive_cotisation");
}