const express = require('express');
const authController = require('../authControllers/auth');

const multer = require('multer');
const upload = multer({ dest: 'uploads/' });

const router = express.Router();

router.post('/', authController.addCustomer );


module.exports = router;