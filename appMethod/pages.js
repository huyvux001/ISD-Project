const mysql = require('mysql2');
const express = require('express');
const authController = require('../authControllers/auth');

const router = express.Router();

const conn = mysql.createConnection({
  user: process.env.DATABASE_USER,
  password: process.env.DATABASE_PASSWORD,
  database: process.env.DATABASE
});

// GET method

// router.get('/', authController.isLoggedIn, (req, res) => {
//   res.render('home.ejs', {
//     user: req.user
//   });
// });

// router.get('/customer/:id', authController.isLoggedIn, authController.details);

// router.get('/addCustomer', authController.isLoggedIn, (req, res) => {
//   res.render('addCustomer.ejs');
// });


router.get('/home', authController.home)

router.get('/details/:id', authController.details);

router.get('/trash', authController.deleteCustomer, authController.recoverCustomer);


module.exports = router;