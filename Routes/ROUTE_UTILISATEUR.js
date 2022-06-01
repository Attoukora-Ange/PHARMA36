const express = require('express');
const controllerUtilisateurs = require('../Controllers/Utilisateurs/Utilisateurs'); 
const Auth = require('../Config/Auth');
const ExterneFonction = require('../Config/ExterneFonction');
const claudinary = require('../helper/uploadImage');

const multer = require('multer');
const fileStorageEgine = multer.diskStorage({})
const upload = multer({storage: fileStorageEgine})

const PDF_StorageEgine = multer.diskStorage({})
const upload_PDF = multer({storage: PDF_StorageEgine})
const ROUTE = express.Router();

// **************GET*******************
ROUTE.get('/', controllerUtilisateurs.getAccueil);
ROUTE.get('/qui_sommes_nous', controllerUtilisateurs.getQui_sommes_nous);
ROUTE.get('/utilisateur/connexion', controllerUtilisateurs.getConnexion);
ROUTE.get('/utilisateur/inscription', controllerUtilisateurs.getInscription);
ROUTE.get('/utilisateur/modifier_profil', ExterneFonction.loggedIn, controllerUtilisateurs.getModifier_profil);
ROUTE.get('/utilisateur/soutenance', ExterneFonction.loggedIn, controllerUtilisateurs.getSoutenance);
ROUTE.get('/utilisateur/modifier_soutenance', ExterneFonction.loggedIn, controllerUtilisateurs.getModifier_soutenance);
ROUTE.get('/contact/contact_detail/:id', ExterneFonction.loggedIn, controllerUtilisateurs.getContact_detail);
ROUTE.get('/evenement', ExterneFonction.loggedIn, controllerUtilisateurs.getEvenement);
ROUTE.get('/contact', ExterneFonction.loggedIn, controllerUtilisateurs.getContact);
ROUTE.get('/cotisation', ExterneFonction.loggedIn, controllerUtilisateurs.getCotisation);
ROUTE.get('/historique_payement', ExterneFonction.loggedIn, controllerUtilisateurs.getHistorique_payement);

// *****************POST***************
ROUTE.post('/evenement', controllerUtilisateurs.postEvenement);
ROUTE.post('/cotisation', controllerUtilisateurs.postCotisation);
ROUTE.post('/utilisateur/connexion', controllerUtilisateurs.postConnexion);
ROUTE.post('/inscription', upload.single('fichier_photo_profil'), controllerUtilisateurs.postInscription);
ROUTE.post('/utilisateur/modifier_profil', upload.single('fichier_photo_profil'), controllerUtilisateurs.postModifier_profil);
ROUTE.post('/utilisateur/modifier_soutenance', upload_PDF.single('fichier_these_pdf'), controllerUtilisateurs.postModifier_soutenance);
ROUTE.post('/utilisateur/soutenance', upload_PDF.single('fichier_these_pdf'), controllerUtilisateurs.postSoutenance);

// ******************DELETE******************
ROUTE.delete('/utilisateur/logOut', controllerUtilisateurs.deteleLogout);



module.exports = ROUTE;