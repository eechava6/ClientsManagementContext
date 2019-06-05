//Defines client routes to post and get request.
const express = require('express');
const router = express.Router();
const clientController = require('../app/api/controllers/clients');

router.post('/registerClient', clientController.create);
router.post('/updateClient', clientController.update);
router.post('/deleteClient', clientController.delete);
router.post('/getClient', clientController.findOne);
router.get('/', clientController.findAll);
router.get('/registerClient',clientController.loadRegister)

module.exports = router;