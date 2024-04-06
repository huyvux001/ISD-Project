const express = require('express');
const authController = require('../authControllers/auth');

const multer = require('multer');
const upload = multer({ dest: 'uploads/' });

const router = express.Router();

// POST method
// TODO
// router.post('/addCustomer', upload.single('file'), authController.isLoggedIn, authController.addCustomer )

router.post('/', authController.addCustomer )

// router.post('/login', authController.login );

// router.get('/logout', authController.logout);


module.exports = router;