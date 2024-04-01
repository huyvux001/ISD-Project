const mysql = require('mysql2');
const md5 = require('md5');
const multer = require('multer');
const upload = multer({ dest: 'uploads/' });

const conn = mysql.createConnection({
    user: process.env.DATABASE_USER,
    password: process.env.DATABASE_PASSWORD,
    database: process.env.DATABASE
});

// Functions (not important for now)

exports.login = async (req, res) => {
    try {
        const {  //... , //...
                                 } = req.body;
        if (!email || !password) {
            return res.status(400).render('login', {
                message: 'Please provide account and password'
            });
        }
        let salt = 'mysupersercretpassword';
        let hashedPassword = await md5(password + salt);

        conn.query('', [], async (error, results) => {
            console.log(results);
            if (condition) {
                return 0;
            } else {
                const userId = results[0].user_id;
                res.cookie('loggedInUserId', userId, {
                    expires: new Date(Date.now() + process.env.COOKIE_EXPIRES * 24 * 60 * 60 * 1000),
                    httpOnly: true
                });
                res.status(200).redirect('/');
            }
        });
    } catch (error) {
        console.log(error);
    }
};

exports.isLoggedIn = async (req, res, next) => {
    if (req.cookies.loggedInUserId) {
        try {
            const loggedInUserId = req.cookies.loggedInUserId;

            conn.query('', [loggedInUserId], (error, result) => {
                if (!result || result.length === 0) {
                    res.clearCookie('loggedInUserId');
                    return res.redirect('/login');
                }

                req.user = result[0];
                return next();
            });
        } catch (error) {
            console.log(error);
            return res.redirect('/login');
        }
    } else {
        return res.redirect('/login');
    }
};

exports.logout = async (req, res) => {
    res.clearCookie('loggedInUserId');
    res.status(200).redirect('/');
};


// IMPORTANT: The following functions are incomplete and should be used as a reference only.
// TODO: View home page with all customers
exports.home = async (req, res) => {

    conn.query(
        'SELECT * FROM Customers',
        (error, results) => {
            if (error) {
                console.error(error);
                return res.status(500).send('Error fetching customers');
            }
            res.render('home.ejs', { customers: results });
        }
    );
};


// TODO: Add a new customer
exports.addCustomer = async (req, res) => {
    exports.addCustomerAndOrder = async (req, res) => {
        const { name, email, phone, orderDetails } = req.body;
    
        const insertCustomerQuery = 
            `INSERT INTO Customers (customer_name, customer_email, customer_phoneNumber)
            VALUES (?, ?, ?)`
        ;
    
        conn.query(insertCustomerQuery, [name, email, phone], (customerError, customerResults) => {
            if (customerError) {
                console.error(customerError);
                return res.status(500).send('Error adding customer');
            }
    
            const customerId = customerResults.insertId; 
            const insertOrderQuery = `
                INSERT INTO Orders (customer_id, order_details)
                VALUES (?, ?)
            `;
    
            conn.query(insertOrderQuery, [customerId, orderDetails], (orderError, orderResults) => {
                if (orderError) {
                    console.error(orderError);
                    return res.status(500).send('Error adding order for customer');
                }
    
                res.redirect('/'); 
            });
        });
    };
};


// TODO: View a customer's details
exports.details = async (req, res) => {
    const customerId = req.params.id;

    const customerQuery = 'SELECT * FROM Customers WHERE customer_id = ?';

    conn.query(customerQuery, [customerId], (error, customerResults) => {
        if (error) {
            console.error(error);
            return res.status(500).send('Error fetching customer details');
        }

        if (customerResults.length > 0) {
            const customer = customerResults[0];
            const query = 'SELECT * FROM Orders WHERE customer_id = ?'; 
            conn.query(query, [customerId], (error, orderResults) => {
                if (error) {
                    console.error(error);
                    return res.status(500).send('Error fetching related details');
                }
                res.render('details.ejs', { customer: customer, orders: orderResults });
            });
        } else {
            return res.status(404).send('Customer not found');
        }
    });
};
