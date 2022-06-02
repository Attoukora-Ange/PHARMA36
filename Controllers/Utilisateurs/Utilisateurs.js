const passport = require("passport");
const DATA_BASE_ARCHIVE = require("../../Models/archive_cotisation");
const DATA_BASE_INSCRIPTION = require("../../Models/inscription");
const BASE_MEMBRE_BUREAU = require("../../Models/ajouter_bureau");
const DATA_BASE_TRESORERIE = require("../../Models/cotisation");
const BASE_CHOIX_TAILLE = require("../../Models/choix_taille");
const BASE_AJOUT_INFO = require("../../Models/ajouter_info");
const BASE_EVENEMENT = require("../../Models/ajouter_eve");
const IMAGE_SLIDE = require('../../Models/image_en_slade');
const BASE_CHOIX_TOGE = require('../../Models/choix_toge')
const bcrypt = require("bcrypt");
const cloudinary = require('../../helper/uploadImage');
// ************GET*********************

module.exports.getAccueil = async (req, res) => {
  const UTILISATEUR_CONNECTE = req.user;
  const INFO = await BASE_AJOUT_INFO.findOne();
  const TOUS_EVENEMENTS_PROMOTIONS = await BASE_EVENEMENT.find();
  const MEMMBRES_BUREAUX = await BASE_MEMBRE_BUREAU.find();
  const IMAGE_SLIDES = await IMAGE_SLIDE.find();
  const indexOption = {
    titre_page: "Accueil",
    INFO,
    UTILISATEUR_CONNECTE,
    TOUS_EVENEMENTS_PROMOTIONS,
    MEMMBRES_BUREAUX,
    IMAGE_SLIDES,

  };
  res.render("index", indexOption);
};
module.exports.getQui_sommes_nous = async (req, res) => {
  const UTILISATEUR_CONNECTE = req.user;

  const indexOption = { titre_page: "Qui sommes nous", UTILISATEUR_CONNECTE };
  res.render("qui_sommes_nous", indexOption);
};
module.exports.getConnexion = (req, res) => {
  const UTILISATEUR_CONNECTE = req.user;

  const indexOption = { titre_page: "Utilisateur", UTILISATEUR_CONNECTE };

  res.render("utilisateurs/connexion", indexOption);
};
module.exports.getInscription = (req, res) => {
  const UTILISATEUR_CONNECTE = req.user;

  const indexOption = { titre_page: "Utilisateur", UTILISATEUR_CONNECTE };
  res.render("utilisateurs/inscription", indexOption);
};
module.exports.getSoutenance = (req, res) => {
  const UTILISATEUR_CONNECTE = req.user;

  const indexOption = { titre_page: "Soutenance", UTILISATEUR_CONNECTE };
  res.render("utilisateurs/soutenance", indexOption);
};
module.exports.getModifier_soutenance = async (req, res) => {
  const id = req.user;
  const UTILISATEUR_CONNECTE = req.user;
  const MODIFIER_PROFIL = await DATA_BASE_INSCRIPTION.findById(id);

  const indexOption = {
    titre_page: "Soutenance",
    UTILISATEUR_CONNECTE,
    MODIFIER_PROFIL,
  };
  res.render("utilisateurs/modifier_soutenance", indexOption);
};
module.exports.getModifier_profil_photo = async (req, res) => {
  const id = req.user;
  const UTILISATEUR_CONNECTE = req.user;
  const MODIFIER_PROFIL = await DATA_BASE_INSCRIPTION.findById(id);

  const indexOption = {
    titre_page: "Utilisateur",
    UTILISATEUR_CONNECTE,
    MODIFIER_PROFIL,
  };
  res.render("utilisateurs/modifier_profil_photo", indexOption);
};
module.exports.getModifier_profil = async (req, res) => {
  const id = req.user;
  const UTILISATEUR_CONNECTE = req.user;
  const MODIFIER_PROFIL = await DATA_BASE_INSCRIPTION.findById(id);

  const indexOption = {
    titre_page: "Utilisateur",
    UTILISATEUR_CONNECTE,
    MODIFIER_PROFIL,
  };
  res.render("utilisateurs/modifier_profil", indexOption);
};
module.exports.getContact_detail = async (req, res) => {
  const { id } = req.params;
  const UTILISATEUR_CONNECTE = req.user;

  const CONTACT_DETAIL = await DATA_BASE_INSCRIPTION.findById(id);
  const indexOption = {
    titre_page: "Contact",
    UTILISATEUR_CONNECTE,
    CONTACT_DETAIL,
  };
  res.render("utilisateurs/contact_detail", indexOption);
};
module.exports.getVoir_image_en_slade = async (req, res) => {
  const { id } = req.params;
  const UTILISATEUR_CONNECTE = req.user;

  const IMAGE_SLIDES = await IMAGE_SLIDE.find();
  const indexOption = {
    titre_page: "Image slide",
    UTILISATEUR_CONNECTE,
    IMAGE_SLIDES,
  };
  res.render("utilisateurs/image_slide", indexOption);
};
module.exports.getEvenement_polos = (req, res) => {
  const UTILISATEUR_CONNECTE = req.user;
  const indexOption = { titre_page: "Choix des polos", UTILISATEUR_CONNECTE };
  res.render("utilisateurs/taille_polo", indexOption);
};
module.exports.getEvenement_toges = (req, res) => {
  const UTILISATEUR_CONNECTE = req.user;
  const indexOption = { titre_page: "Choix des toges", UTILISATEUR_CONNECTE };
  res.render("utilisateurs/taille_toge", indexOption);
};
module.exports.getContact = async (req, res) => {
  const UTILISATEUR_CONNECTE = req.user;
  const CONTACTS = await DATA_BASE_INSCRIPTION.find();

  const indexOption = { titre_page: "Contact", UTILISATEUR_CONNECTE, CONTACTS };
  res.render("utilisateurs/contact", indexOption);
};
module.exports.getCotisation = (req, res) => {
  const UTILISATEUR_CONNECTE = req.user;

  const indexOption = { titre_page: "Cotisation", UTILISATEUR_CONNECTE };
  res.render("utilisateurs/cotisation", indexOption);
};
module.exports.getHistorique_payement = async (req, res) => {
  const { id } = req.user;
  const UTILISATEUR_CONNECTE = req.user;
  const HIST_COTISATIONS = await DATA_BASE_ARCHIVE.find({
    identifiant_utilisateur: id,
  });
  const indexOption = {
    titre_page: "Historique",
    UTILISATEUR_CONNECTE,
    HIST_COTISATIONS,
  };
  res.render("utilisateurs/historique_payement", indexOption);
};
// ***********POST***********************
module.exports.postEvenement_polo = (req, res) => {
  const { choix_taille } = req.body;
  if(!choix_taille || choix_taille == '') return res.redirect('/evenement');
  const NEW_CHOIX = new BASE_CHOIX_TAILLE({
    nom: req.user.nom,
    prenom: req.user.prenom,
    choix: choix_taille,
  });

  NEW_CHOIX.save((e) => {
    if (e) return console.log("ERREUR AU COURS DU CHOIX TAILLE");
    console.log("CHOIX TAILLE A REUSSI");
  });

  res.send("Votre choix à bien été effectué.");
};
module.exports.postEvenement_toge = (req, res) => {
  const { long_epaule, long_manche, long_robe } = req.body;
  if(!long_epaule || long_epaule == '' || !long_manche || long_manche == '' 
  || !long_robe || long_robe == '') return res.redirect('/evenement');
  const NEW_CHOIX_TOGES = new BASE_CHOIX_TOGE({
    nom: req.user.nom,
    prenom: req.user.prenom,
    long_epaule,
    long_manche,
    long_robe,
  });

  NEW_CHOIX_TOGES.save((e) => {
    if (e) return console.log("ERREUR AU COURS DU CHOIX TAILLE");
    console.log("CHOIX TAILLE A REUSSI");
  });

  res.send("Votre choix à bien été effectué.");
};
module.exports.postSoutenance = async (req, res) => {
  const id = req.user;
  const {
    soutenue,
    date_soutenance,
    departement,
    directeur,
    titre_sujet,
    resume,
  } = req.body;
  if(soutenue == false || !req.file) return res.redirect('/utilisateur/soutenance');
  if(!date_soutenance || !departement || !directeur || !titre_sujet || !resume) return res.send('Merci de renseigner tous les champs!');
  let fichier_these_pdf = await cloudinary.uploader.upload(req.file.path);;
  fichier_pdf = fichier_these_pdf.secure_url;
  const AJOUT = {
    soutenue,
    date_soutenance,
    departement,
    directeur,
    titre_sujet,
    resume,
    fichier_pdf,
  };
  await DATA_BASE_INSCRIPTION.findByIdAndUpdate(id, AJOUT);

  res.send("Vos données on bien été ajouté");
};
module.exports.postConnexion = passport.authenticate("local", {
  failureRedirect: "/utilisateur/connexion",
  successRedirect: "/",
  failureFlash: true,
});

module.exports.postCotisation = (req, res) => {
  const {
    type_cotisation,
    montant_cotisation,
    type_payement_cotisation,
    nom_tresoriere_cotisation,
    numero_depot_cotisation,
    date_payement_cotisation,
  } = req.body;
  if (!montant_cotisation || isNaN(montant_cotisation) || montant_cotisation =='') {
    res.redirect("/cotisation");
  }
  const NEW_COTISATION = new DATA_BASE_TRESORERIE({
    identifiant_utilisateur: req.user.id,
    nom_membre: req.user.nom,
    prenom_membre: req.user.prenom,
    type_payement_cotisation,
    montant_cotisation,
    type_cotisation,
    nom_tresoriere_cotisation,
    numero_tresoriere_cotisation: numero_depot_cotisation,
    date_payement_cotisation,
  });
  NEW_COTISATION.save((e) => {
    if (e)
      return console.log(
        "ERREUR AU COURS DE L'ENVOIE DE PAYEMENT DE LA COTISATION"
      );
    console.log("PAYEMENT DE LA COTISATION A REUSSI");
  });
  res.redirect("/historique_payement");
};

module.exports.postModifier_soutenance = async (req, res) => {
  const id = req.user;
  const {
    soutenue,
    date_soutenance,
    departement,
    directeur,
    titre_sujet,
    resume,
  } = req.body;
  if(soutenue == false || !req.file) return res.redirect('/utilisateur/soutenance');
  if(!date_soutenance || !departement || !directeur || !titre_sujet || !resume) return res.send('Merci de renseigner tous les champs!');
  let fichier_these_pdf = await cloudinary.uploader.upload(req.file.path);;
  fichier_pdf = fichier_these_pdf.secure_url;
  const AJOUT = {
    soutenue,
    date_soutenance,
    departement,
    directeur,
    titre_sujet,
    resume,
    fichier_pdf,
  };
  await DATA_BASE_INSCRIPTION.findByIdAndUpdate(id, AJOUT);
  res.redirect("/");
};
module.exports.postModifier_profil_photo = async (req, res) => {
  const id = req.user;
  const ID_password = id.password;
  let {
    conf_password,
  } = req.body;

  if (!req.file) {
    return res.send(
      "Assurez-vous que tous les champs ont bien été remplis y compris la photo de profil ou changer de photo de profil"
    );
  }

  if (
    !conf_password
  ) {
    return res.send("Assurez-vous que le champs mot de passe à bien été remplis");
  }
  // const hashPass = await bcrypt.genSalt(10);
  const pass_verifie = await bcrypt.compare(conf_password, ID_password);
  if (!pass_verifie) {
    return res.send("Désolé, vous n'avez pas entré le bon mot de passe.");
  }
  const photo_profil = await cloudinary.uploader.upload(req.file.path);
  const AJOUT = {
    photo_profil: photo_profil.secure_url,
  };
  await DATA_BASE_INSCRIPTION.findByIdAndUpdate(id, AJOUT);
  res.send("Modification efectuée");
};
module.exports.postModifier_profil = async (req, res) => {
  const id = req.user;
  const ID_password = id.password;
  console.log('===========')
  console.log(ID_password)
  let {
    nom,
    prenom,
    date_naissance,
    domicile,
    telephone,
    email,
    reseau_social,
    identifiant_reseau,
    lieu_exercice,
    contact_parent,
    choix_status,
    password,
    conf_password,
  } = req.body;
  console.log(req.body)
  console.log(nom, prenom)

  // if (!req.file) {
  //   return res.send(
  //     "Assurez-vous que tous les champs ont bien été remplis y compris la photo de profil ou changer de photo de profil"
  //   );
  // }

  if (
    !nom ||
    !prenom ||
    !date_naissance ||
    !telephone ||
    !email ||
    !identifiant_reseau ||
    !lieu_exercice ||
    !contact_parent ||
    !password ||
    !conf_password
  ) {
    return res.send("Assurez-vous que tous les champs ont bien été remplis");
  }
  const hashPass = await bcrypt.genSalt(10);
  const pass_verifie = await bcrypt.compare(conf_password, ID_password);
  if (!pass_verifie) {
    return res.send("Assurez-vous que l'ancien mot de passe est correct");
  }

  password = await bcrypt.hash(password, hashPass);
 
  // const photo_profil = await cloudinary.uploader.upload(req.file.path);
  const AJOUT = {
    // photo_profil: photo_profil.secure_url,
    nom,
    prenom,
    date_naissance,
    domicile,
    telephone,
    email,
    reseau_social,
    identifiant_reseau,
    lieu_exercice,
    contact_parent,
    status_promotion: choix_status,
    password,
  };
  await DATA_BASE_INSCRIPTION.findByIdAndUpdate(id, AJOUT);
  res.send("Modification efectuée");
};
module.exports.postInscription = async (req, res) => {
  let {
    nom,
    prenom,
    date_naissance,
    domicile,
    telephone,
    email,
    reseau_social,
    identifiant_reseau,
    lieu_exercice,
    contact_parent,
    choix_status,
    password,
    conf_password,
  } = req.body;

  if (!req.file) {
    return res.send(
      "Assurez-vous que tous les champs ont bien été remplis y compris la photo de profil"
    );
  }

  if (
    !nom ||
    !prenom ||
    !date_naissance ||
    !telephone ||
    !email ||
    !identifiant_reseau ||
    !lieu_exercice ||
    !contact_parent ||
    !password ||
    !conf_password
  ) {
    return res.send("Assurez-vous que tous les champs ont bien été remplis");
  }
  if (password !== conf_password) {
    return res.send(
      "Assurez-vous que le mot de passe et la confirmation de mot de passe sont identique"
    );
  }

  photo_profil = await cloudinary.uploader.upload(req.file.path);
  photo_profil = photo_profil.secure_url;
  const hashPass = await bcrypt.genSalt(10);
  password = await bcrypt.hash(password, hashPass);

  const NEW_INSCRIPTION = new DATA_BASE_INSCRIPTION({
    photo_profil,
    nom,
    prenom,
    date_naissance,
    domicile,
    telephone,
    email,
    lieu_exercice,
    contact_parent,
    reseau_social,
    identifiant_reseau,
    status_promotion: choix_status,
    soutenue: false,
    date_soutenance: "aucune",
    departement: "aucune",
    directeur: "aucune",
    titre_sujet: "aucune",
    resume: "aucune",
    fichier_pdf: "aucune",
    password,
  });
  NEW_INSCRIPTION.save((e) => {
    if (e) return console.log("ERREUR AU COURS DE LINSCRIPTION");
    console.log("INSCRIPTION A REUSSI");
  });
  res.redirect("/utilisateur/connexion");
};

module.exports.deteleLogout = (req, res) => {
  req.logout(req.user, (err) => {
    if (err) return next(err);
    res.redirect("/utilisateur/connexion");
  });
};
