const express = require('express');
const authController = require('../authControllers/auth');

const multer = require('multer');
const upload = multer({ dest: 'uploads/' });

const router = express.Router();

// POST method

router.post('/login', authController.login );

router.post('/addCustomer', upload.single('file'), authController.isLoggedIn, authController.addCustomer )


router.get('/logout', authController.logout);


module.exports = router;