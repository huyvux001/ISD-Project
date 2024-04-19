create database customer_management;
drop database customer_management;
use customer_management;
SET GLOBAL event_scheduler = ON;
-- Creating the tables
CREATE TABLE Salespersons (
    sales_id INT PRIMARY KEY,
    sales_name VARCHAR(255)
);

CREATE TABLE WebsiteAccounts (
    account_id INT AUTO_INCREMENT PRIMARY KEY,
    username VARCHAR(255),
    password VARCHAR(255),
    active_status BOOLEAN
);

CREATE TABLE Customers (
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

CREATE TABLE Products (
    product_id INT AUTO_INCREMENT PRIMARY KEY,
    product_type VARCHAR(100),
    description VARCHAR(255)
);

CREATE TABLE Orders (
    order_id INT AUTO_INCREMENT PRIMARY KEY,
    customer_id INT,
    product_id INT,
    order_amount INT,
    order_buyDate DATE,
    order_paidStatus BOOLEAN,
    payment_date DATE,
    shipment_date DATE,
    shipment_process TEXT,
    FOREIGN KEY (customer_id) REFERENCES Customers(customer_id),
    FOREIGN KEY (product_id) REFERENCES Products(product_id)
);

CREATE TABLE AdminSalesAccounts (
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
-- select * from customers;
-- select * from orders;
-- select * from products;
-- select * from salespersons;
-- select * from adminsalesaccounts;
-- select * from websiteaccounts;

-- INSERT INTO Salespersons (sales_id, sales_name) VALUES (1, 'Alice Johnson'), (2, 'Bob Lee');
-- INSERT INTO WebsiteAccounts (username, password, active_status) VALUES ('john.doe', 'password123', TRUE), ('jane.smith', 'password123', TRUE);
-- INSERT INTO Customers (sales_id, customer_type, customer_code, customer_name, customer_email, customer_phoneNumber, customer_citizenID, add_date, website_account_id, is_deleted, deleted_at)
-- VALUES
-- (1, 'Regular', 'CUST001', 'John Doe', 'john.doe@example.com', '123-456-7890', '123456789', '2023-04-01', 1, FALSE, NULL),
-- (2, 'VIP', 'CUST002', 'Jane Smith', 'jane.smith@example.com', '987-654-3210', '987654321', '2023-04-02', 2, FALSE, NULL);
-- INSERT INTO Products (product_type, description) VALUES
-- ('Shirt', 'T-Shirt, Cotton, Medium'),
-- ('Pants', 'Jeans, Denim, Size 32');
-- INSERT INTO Orders (customer_id, product_id, order_amount, order_buyDate, order_paidStatus, payment_date, shipment_date, shipment_process) VALUES
-- (1, 1, 2, '2023-04-03', TRUE, '2023-04-03', '2023-04-05', 'Shipped'),
-- (2, 2, 1, '2023-04-04', FALSE, NULL, NULL, 'Pending');
-- INSERT INTO AdminSalesAccounts (username, password, role) VALUES
-- ('admin1', 'securepassword', 'admin'),
-- ('sales1', 'securepassword', 'sales');








    
	