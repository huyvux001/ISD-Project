-- create database customer_management;
-- drop database customer_management;
use customer_management;
SET GLOBAL event_scheduler = ON;
-- Creating the tables

-- Sales person who manage the customer's information, customer's order history
CREATE TABLE IF NOT EXISTS Salespersons (
    sales_id INT PRIMARY KEY,
    sales_name VARCHAR(255)
);

-- Accounts for customer (just present)
CREATE TABLE IF NOT EXISTS WebsiteAccounts (
    account_id INT AUTO_INCREMENT PRIMARY KEY,
    username VARCHAR(255),
    password VARCHAR(255),
    active_status BOOLEAN
);

-- Customer's information
CREATE TABLE IF NOT EXISTS Customers (
    customer_id INT AUTO_INCREMENT PRIMARY KEY,
    sales_id INT,
    customer_type VARCHAR(255),
    customer_code VARCHAR(100),
    customer_name VARCHAR(255),
    customer_email VARCHAR(255),
    customer_phoneNumber VARCHAR(20),
    customer_citizenID VARCHAR(20),
    add_date DATE,
    website_account_id INT,
    FOREIGN KEY (sales_id) REFERENCES Salespersons(sales_id),
    FOREIGN KEY (website_account_id) REFERENCES WebsiteAccounts(account_id)
);

-- Shoes database
CREATE TABLE IF NOT EXISTS Shoes (
    shoes_id INT AUTO_INCREMENT PRIMARY KEY,
    shoes_brand VARCHAR(255),
    shoes_name VARCHAR(255) NOT NULL,
    shoes_type VARCHAR(255),  
    shoes_size VARCHAR(10),
    shoes_color VARCHAR(50),
    shoes_material VARCHAR(255),
    shoes_price DECIMAL(10, 2),
    shoes_status varchar(255),
    discounted_price DECIMAL(10, 2) DEFAULT NULL
);
CREATE TABLE IF NOT EXISTS ShoeImages (
    image_id INT AUTO_INCREMENT PRIMARY KEY,
    shoes_id INT,
    image_url VARCHAR(255),
    FOREIGN KEY (shoes_id) REFERENCES Shoes(shoes_id)
);

-- Order's history
CREATE TABLE IF NOT EXISTS Orders (
    order_id INT AUTO_INCREMENT PRIMARY KEY,
    order_code VARCHAR(255),
    customer_id INT,
    shoes_id INT,
    order_amount INT,
    order_cost DECIMAL(10, 2),
    order_buyDate DATE,
    payment_status VARCHAR(255),
    payment_date DATE,
    shipment_date DATE,
    shipment_process TEXT,
    FOREIGN KEY (customer_id) REFERENCES Customers(customer_id),
    FOREIGN KEY (shoes_id) REFERENCES Shoes(shoes_id)
);

-- Admin and Sales accounts
CREATE TABLE IF NOT EXISTS AdminSalesAccounts (
    account_id INT AUTO_INCREMENT PRIMARY KEY,
    username VARCHAR(255),
    password VARCHAR(255),
    role ENUM('admin', 'sales')
);

-- Alter Customers table to add soft delete functionality
ALTER TABLE Customers
ADD COLUMN is_deleted BOOLEAN DEFAULT FALSE,
ADD COLUMN deleted_at DATETIME DEFAULT NULL;

-- Create an event to automatically remove deleted records older than 10 days
DELIMITER $$

CREATE EVENT IF NOT EXISTS ev_AutoDeleteTrash
ON SCHEDULE EVERY 1 DAY
STARTS CURRENT_TIMESTAMP
DO
  BEGIN
    DELETE FROM Customers
    WHERE is_deleted = TRUE AND deleted_at < NOW() - INTERVAL 10 DAY;
  END$$

DELIMITER ;


-- Test
select * from customers;
select * from orders;
select * from shoes;
select * from shoeimages;
select * from salespersons;
select * from adminsalesaccounts;
select * from websiteaccounts;









    
	