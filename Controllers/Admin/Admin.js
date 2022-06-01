const BASE_AJOUT_EVE = require("../../Models/ajouter_eve");
const BASE_AJOUT_INFO = require("../../Models/ajouter_info");
const BASE_MEMBRE_BUREAU = require("../../Models/ajouter_bureau");
const BASE_CHOIX_TAILLE = require("../../Models/choix_taille");
const BASE_IMAGE_SLIDE = require('../../Models/image_en_slade');
const BASE_CHOIX_TOGE = require('../../Models/choix_toge');
const cloudinary = require('../../helper/uploadImage');
// ******************************************

// *******************GET*********************
module.exports.getAjouter_eve = (req, res) => {
  const UTILISATEUR_CONNECTE = req.user;

  const indexOption = { titre_page: "Ajouter évènement", UTILISATEUR_CONNECTE };
  res.render("admin/ajouter_eve", indexOption);
};
module.exports.getAjouter_image_en_slade = (req, res) => {
  const UTILISATEUR_CONNECTE = req.user;

  const indexOption = { titre_page: "Ajouter image en slade", UTILISATEUR_CONNECTE };
  res.render("admin/ajouter_image_en_slade", indexOption);
};
module.exports.getAjouter_info = (req, res) => {
  const UTILISATEUR_CONNECTE = req.user;

  const indexOption = {
    titre_page: "Ajouter information",
    UTILISATEUR_CONNECTE,
  };
  res.render("admin/ajouter_info", indexOption);
};
module.exports.getModifier_info = async (req, res) => {
  const UTILISATEUR_CONNECTE = req.user;
  const id = req.params.id;
  const OBTENIR_INFORMATION = await BASE_AJOUT_INFO.findById(id);

  const indexOption = {
    titre_page: "Ajouter information",
    UTILISATEUR_CONNECTE,
    OBTENIR_INFORMATION,
  };
  res.render("admin/modifier_info", indexOption);
};
module.exports.getAjouter_bureau = (req, res) => {
  const UTILISATEUR_CONNECTE = req.user;

  const indexOption = {
    titre_page: "Ajouter membre du bureau",
    UTILISATEUR_CONNECTE,
  };
  res.render("admin/ajouter_bureau", indexOption);
};
module.exports.getModifier_eve = async (req, res) => {
  const UTILISATEUR_CONNECTE = req.user;
  const id = req.params.id;
  const MODIFIER_EVENEMENT = await BASE_AJOUT_EVE.findById(id)
  const indexOption = {
    titre_page: "Modifier évènement",
    UTILISATEUR_CONNECTE,
    MODIFIER_EVENEMENT,
  };
  res.render("admin/modifier_eve", indexOption);
};
module.exports.getModifier_bureau = async(req, res) => {
  const UTILISATEUR_CONNECTE = req.user;
  const {id} = req.params;
const MODIFIER_BUREAU = await BASE_MEMBRE_BUREAU.findById(id);
console.log(MODIFIER_BUREAU)
  const indexOption = {
    titre_page: "Modifier membre du bureau",
    UTILISATEUR_CONNECTE,
    MODIFIER_BUREAU,
  };
  res.render("admin/modifier_bureau", indexOption);
};
module.exports.getVoir_choix_polos = async (req, res) => {
  const UTILISATEUR_CONNECTE = req.user;
  const TOUS_CHOIX = await BASE_CHOIX_TAILLE.find();

  const indexOption = {
    titre_page: "Voir choix de polos",
    UTILISATEUR_CONNECTE,
    TOUS_CHOIX,
  };
  res.render("admin/choix_taille_polo", indexOption);
};
module.exports.getVoir_choix_toges = async (req, res) => {
  const UTILISATEUR_CONNECTE = req.user;
  const TOUS_CHOIX_TOGES = await BASE_CHOIX_TOGE.find();

  const indexOption = {
    titre_page: "Voir choix des toges",
    UTILISATEUR_CONNECTE,
    TOUS_CHOIX_TOGES,
  };
  res.render("admin/choix_taille_toge", indexOption);
};

// *************POST*************
module.exports.postAjouter_eve = async (req, res) => {
  let {
    type_evenement,
    date_evenement,
    photo_evenement,
    description_evenement,
  } = req.body;

  photo_evenement = await cloudinary.uploader.upload(req.file.path);
  photo_evenement = photo_evenement.secure_url;
  const NEW_EVENEMENT = new BASE_AJOUT_EVE({
    type_evenement,
    date_evenement,
    photo_evenement,
    description_evenement,
  });
  NEW_EVENEMENT.save((e) => {
    if (e)
      return console.log("ERREUR AU COURS DE L'ENREGISTREMENT DE L'EVENEMENT");
    console.log("ENREGISTREMENT DE L'EVENEMENT A REUSSI");
  });
  res.redirect("/");
};
module.exports.postAjouter_image_en_slade = async (req, res) => {
  let {
    photo_evenement,
  } = req.body;

  photo_evenement = await cloudinary.uploader.upload(req.file.path);
  photo_evenement = photo_evenement.secure_url;
  const NEW_IMAGE_SLIDES = new BASE_IMAGE_SLIDE({
    photo_evenement,
  });
  NEW_IMAGE_SLIDES.save((e) => {
    if (e)
      return console.log("ERREUR AU COURS DE L'ENREGISTREMENT DE L'IMAGE");
    console.log("ENREGISTREMENT DE L'IMAGE A REUSSI");
  });
  res.redirect("/");
};
module.exports.postAjouter_info = (req, res) => {
  const { titre_info, auteur_info, date_publication_info, description_info } =
    req.body;
  const NEW_INFO = new BASE_AJOUT_INFO({
    titre_info,
    auteur_info,
    date_publication_info,
    description_info,
  });
  NEW_INFO.save((e) => {
    if (e) return console.log("ERREUR AU COURS DE L'ENVOIE DES INFORMATIONS");
    console.log("ENVOIE DES INFO A REUSSI");
  });
  res.redirect("/");
};
module.exports.postAjouter_bureau = async (req, res) => {
  let{ nom_bureau, titre_bureau, bureau_photo } = req.body;
  // bureau_photo = req.file.filename
  bureau_photo = await cloudinary.uploader.upload(req.file.path);
  bureau_photo = bureau_photo.secure_url;

  const NEW_MEMBRE_BUREAU = new BASE_MEMBRE_BUREAU({
    nom_bureau,
    titre_bureau,
    bureau_photo
  });
  NEW_MEMBRE_BUREAU.save((e) => {
    if (e)
      return console.log(
        "ERREUR AU COURS DE L'ENREGISTREMENT DU MEMBRE DU BUREAU"
      );
    console.log("ENREGISTREMENT DU MEMBRE A REUSSI");
  });
  res.redirect("/");
};
module.exports.postModifier_eve = async (req, res) => {
  const {id} = req.params;
  const type_evenement = req.body.type_evenement;
  const date_evenement = req.body.date_evenement;
  const description_evenement = req.body.description_evenement;

  let photo_evenement = await cloudinary.uploader.upload(req.file.path);
     photo_evenement = photo_evenement.secure_url;
  const AJOUT = {type_evenement, date_evenement, photo_evenement, description_evenement};
   await BASE_AJOUT_EVE.findByIdAndUpdate(id, AJOUT);
  res.redirect("/");
};
module.exports.postModifier_info = async (req, res) => {
  const {id} = req.params;
  await BASE_AJOUT_INFO.findByIdAndUpdate(id, req.body);

  res.redirect("/");
};

module.exports.postModifier_bureau = async (req, res) => {
 const {id} = req.params;
 const nom_bureau = req.body.nom_bureau;
  const titre_bureau = req.body.titre_bureau;
  let bureau_photo = await cloudinary.uploader.upload(req.file.path);;
      bureau_photo = bureau_photo.secure_url;
  const AJOUT = {nom_bureau, titre_bureau, bureau_photo};
  console.log(id, bureau_photo);


  await BASE_MEMBRE_BUREAU.findByIdAndUpdate(id, AJOUT);
    res.redirect("/");
  };

module.exports.postSupprimer_eve = async (req, res) => {
  const { id } = req.body;
  console.log(id);
  await BASE_AJOUT_EVE.findByIdAndDelete(id);

  res.redirect("/");
};
module.exports.postSupprimer_choix_polos = async (req, res) => {
  const { id } = req.body;
  console.log(id);
  await BASE_CHOIX_TAILLE.findByIdAndDelete(id);

  res.redirect("/admin/voir_choix_polos");
};
module.exports.postSupprimer_choix_toges = async (req, res) => {
  const { id } = req.body;
  console.log(id);
  await BASE_CHOIX_TOGE.findByIdAndDelete(id);

  res.redirect("/admin/voir_choix_toges");
};
module.exports.postSupprimer_info = async (req, res) => {
  const { id } = req.body;
  await BASE_AJOUT_INFO.findByIdAndDelete(id);

  res.redirect("/");
};
module.exports.postSupprimer_membre_bureau = async (req, res) => {
  const { id } = req.body;
  await BASE_MEMBRE_BUREAU.findByIdAndDelete(id);

  res.redirect("/");
};

