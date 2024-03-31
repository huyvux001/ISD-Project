create table CustomerType (
	customer_typeID int not null auto_increment,
    customer_type enum('Bronze', 'Silver', 'Gold', 'VIP') not null,
    primary key (customer_typeID)
    );

create table Customers (
	customer_id int not null unique auto_increment,
    sales_id int not null,
    customer_typeID int not null,
    customer_code varchar(300) not null,
    customer_name varchar(300) not null,
    customer_email varchar(300) not null,
    customer_phoneNumber varchar(20) not null,
    customer_citizenID int not null,
    contract_id int not null,
    active_account varchar(300) not null,
    primary key (customer_id),
    constraint FK foreign key (customer_typeID) references CustomerType(customer_typeID)
    );

create table CustomerActiveAccounts (
	customer_id int not null,
    account_name varchar(50) not null,
    account_password varchar(50) not null,
    constraint FK1 foreign key (customer_id) references Customers(customer_id)
    );
    
create table PointManagement (
	point_id int not null,
    customer_id int not null,
    customer_typeID int not null,
    point_amout int not null,
    primary key (point_id),
	constraint FK3 foreign key (customer_id) references Customers(customer_id),
    constraint FK4 foreign key (customer_typeID) references CustomerType(customer_typeID)
    );
	
create table Sales (
	sales_id int not null primary key,
    sales_name varchar(300) not null,
    customer_id int not null,
    constraint FK5 foreign key (customer_id) references Customers(customer_id)
    );
    
create table Orders (
	order_id int not null unique primary key,
    customer_id int not null unique auto_increment,
    order_date date not null,
    order_status varchar(300) not null,
    constraint FK6 foreign key (customer_id) references Customers(customer_id)
    );
    
create table OrderActivities (
	order_id int not null unique,
    action_type varchar(300) not null,
    action_date date not null,
    constraint FK7 foreign key (order_id) references Orders(order_id)
    );
    
create table Payments (
	payment_id int not null unique primary key,
    order_id int not null,
    payments_amount int not null,
    payment_status varchar(300) not null,
    payment_date date not null,
    payment_warning varchar(300),
    constraint FK8 foreign key (order_id) references Orders(order_id)
    );

create table ContractCategories (
	category_id int not null primary key,
    category_name varchar(300) not null
    );
    
create table Contract (
	contract_id int not null unique auto_increment primary key,
    category_id int not null,
    contract_code varchar(300) not null,
    constraint FK9 foreign key (category_id) references ContractCategories(category_id)
    );
    
    
-- -- Test
-- INSERT INTO ContractCategories (category_id, category_name) VALUES (1, 'Basic Plan');
-- INSERT INTO ContractCategories (category_id, category_name) VALUES (2, 'Premium Plan');
-- INSERT INTO CustomerType (customer_type) VALUES ('Bronze');
-- INSERT INTO CustomerType (customer_type) VALUES ('Silver');
-- INSERT INTO Contract (category_id, contract_code) VALUES (1, 'CT0001');
-- INSERT INTO Contract (category_id, contract_code) VALUES (1, 'CT0002');
-- INSERT INTO Contract (category_id, contract_code) VALUES (2, 'CT0002');
-- -- Assuming you're going to link this sales record to a customer later
-- INSERT INTO Customers (sales_id, customer_typeID, customer_code, customer_name, customer_email, customer_phoneNumber, customer_citizenID, contract_id, active_account) 
-- VALUES (1, 1, 'CUST0001', 'John Doe', 'john@example.com', '555-1234', 123456789, 1, 'Yes');
-- INSERT INTO Sales (sales_id, sales_name, customer_id) VALUES (1, 'Alice', 1);

-- -- Assuming John Doe has customer_id = 1
-- INSERT INTO CustomerActiveAccounts (customer_id, account_name, account_password) VALUES (1, 'john_doe_account', 'password123');
-- -- Insert an Order (Note: your design might need adjustment because customer_id should not be unique auto_increment here)
-- INSERT INTO Orders (order_id, customer_id, order_date, order_status) VALUES (1, 1, '2024-03-29', 'Processed');


    
    
	