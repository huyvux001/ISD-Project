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
            return res.json(results)
        }
    );
};

// TODO: Add a new customer, take the real date
async function queryDatabaseForCustomerCount(dateString, typeAbbreviation) {
    return Math.floor(Math.random() * 100); 
}

const generateCustomId = async (customerType, date) => {
    const typeAbbreviation = customerType === 'CN' ? 'CN' : customerType === 'DN' ? 'DN' : 'NONE';

    const day = date.getDate().toString().padStart(2, '0');
    const month = (date.getMonth() + 1).toString().padStart(2, '0');
    const year = date.getFullYear().toString();

    const dateString = `${day}${month}${year}`;

    const customerCountToday = await queryDatabaseForCustomerCount(dateString, typeAbbreviation);
    const sequentialNumber = (customerCountToday + 1).toString().padStart(3, '0');

    const customId = `${typeAbbreviation}${sequentialNumber}${dateString}`;
    console.log(customId);
    
    return customId;
};


exports.addCustomer = async (req, res) => {
    const { name, phone, cc, email, type } = req.body;
    const saleID = 1;

    try {
        const date = new Date(); 
        const customerCode = await generateCustomId(type, date);

        const insertCustomerQuery = `
            INSERT INTO Customers (sales_id, customer_typeID, contract_id, active_account, customer_code, customer_name, customer_phoneNumber, customer_citizenID, customer_email)
            VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?)
        `;

        conn.query(insertCustomerQuery, [saleID, saleID, saleID, saleID, customerCode, name, phone, cc, email], (customerError, customerResults) => {
            if (customerError) {
                console.error(customerError);
                return res.status(500).send('Error adding customer');
            }
            console.log(customerResults);
            return res.json(customerResults);
        });
    } catch (error) {
        console.error(error);
        return res.status(500).send('Server error');
    }
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
            const query = `
                SELECT Customers.*, customeractiveaccounts.account_name
                FROM Customers
                LEFT JOIN customeractiveaccounts ON Customers.customer_id = customeractiveaccounts.customer_id
                WHERE Customers.customer_id = ?
            `;
            conn.query(query, [customerId], (error, results) => {
                if (error) {
                    console.error(error);
                    return res.status(500).send('Error fetching related details');
                }
                return res.json({
                    customer: customer,
                    CustomerActiveAccounts: results
                });
            });
        } else {
            return res.status(404).send('Customer not found');
        }
    });
};
