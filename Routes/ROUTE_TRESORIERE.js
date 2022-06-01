const express = require('express');
const controllerTresoriere = require('../Controllers/Tresoriere/Tresoriere');
const ExterneFonction = require('../Config/ExterneFonction');
const ROUTE = express.Router();



// ****************GET****************
ROUTE.get('/cotisation_attente', ExterneFonction.loggedIn, controllerTresoriere.getPayement_attente);
ROUTE.get('/archive_cotisation', ExterneFonction.loggedIn, controllerTresoriere.getArchive_payement);
// ****************POST****************
ROUTE.post('/cotisation_attente', controllerTresoriere.postPayement_attente);
ROUTE.post('/supprimer_cotisation_attente', controllerTresoriere.postSupprimer_cotisation_attente);
ROUTE.post('/supprimer_cotisation_archive', controllerTresoriere.postSupprimer_cotisation_archive);
module.exports = ROUTE;