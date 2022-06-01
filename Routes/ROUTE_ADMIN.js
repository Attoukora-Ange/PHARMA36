const express = require('express');
const controllerAdmin = require('../Controllers/Admin/Admin');
const ExterneFonction = require('../Config/ExterneFonction');
const claudinary = require('../helper/uploadImage');
const multer = require('multer');
const ROUTE = express.Router();

// ************************************************
const fileStorageEgine = multer.diskStorage({})
const upload = multer({storage: fileStorageEgine});

// *************GET****************
ROUTE.get('/ajouter_eve', ExterneFonction.loggedIn, controllerAdmin.getAjouter_eve);
ROUTE.get('/ajouter_image_en_slade', ExterneFonction.loggedIn, controllerAdmin.getAjouter_image_en_slade);
ROUTE.get('/ajouter_info', ExterneFonction.loggedIn, controllerAdmin.getAjouter_info);
ROUTE.get('/ajouter_bureau', ExterneFonction.loggedIn, controllerAdmin.getAjouter_bureau);
ROUTE.get('/modifier_eve/:id', ExterneFonction.loggedIn, controllerAdmin.getModifier_eve);
ROUTE.get('/modifier_info/:id', ExterneFonction.loggedIn, controllerAdmin.getModifier_info);
ROUTE.get('/modifier_bureau/:id', ExterneFonction.loggedIn, controllerAdmin.getModifier_bureau);
ROUTE.get('/voir_choix', ExterneFonction.loggedIn, controllerAdmin.getVoir_choix);

// *************POST**********************
ROUTE.post('/ajouter_eve', upload.single('photo_evenement'), controllerAdmin.postAjouter_eve);
ROUTE.post('/ajouter_image_en_slade', upload.single('photo_evenement'), controllerAdmin.postAjouter_image_en_slade);
ROUTE.post('/ajouter_info', controllerAdmin.postAjouter_info);
ROUTE.post('/ajouter_bureau', upload.single('bureau_photo'), controllerAdmin.postAjouter_bureau);
ROUTE.post('/modifier_info/:id', controllerAdmin.postModifier_info);
ROUTE.post('/modifier_eve/:id', upload.single('photo_evenement'), controllerAdmin.postModifier_eve);
ROUTE.post('/modifier_bureau/:id', upload.single('bureau_photo'), controllerAdmin.postModifier_bureau);
ROUTE.post('/supprimer_eve', controllerAdmin.postSupprimer_eve);
ROUTE.post('/supprimer_choix', controllerAdmin.postSupprimer_choix);
ROUTE.post('/supprimer_info', controllerAdmin.postSupprimer_info);
ROUTE.post('/supprimer_membre_bureau', controllerAdmin.postSupprimer_membre_bureau);



module.exports = ROUTE;