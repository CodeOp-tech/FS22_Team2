SET FOREIGN_KEY_CHECKS=0;
DROP TABLE IF EXISTS users;
DROP TABLE IF EXISTS shops;
DROP TABLE IF EXISTS products;
DROP TABLE IF EXISTS purchases;
DROP TABLE IF EXISTS purchased_items;


CREATE TABLE users (
	user_id INT NOT NULL AUTO_INCREMENT,
	username varchar(30) NOT NULL UNIQUE,
	password varchar(100) NOT NULL,
	email varchar(100) NOT NULL,
	user_points INT,
	shop_id INT,
	PRIMARY KEY (user_id)
);

INSERT INTO users (username, password, email, user_points, shop_id)
VALUES 
('user1_buyer', '$2b$12$eFzMWbS9SogNtxkmo3J7aO8FQMFQSKbtpwLMIOVsF6GGKpTQdgq.W', 'user1@msb.inc', 0, null),
('user2_seller', '$2b$12$WZcGPyrkCvD5e8m0Qz/nFOdBryUcsp6uDlE2MDo/AjuBhPrQBCfI6', 'user2@msb.inc', 0, 1),
('user3_seller', '$2b$12$tiAz4eaXlpU.CdltUVvw6udLA2BWsitk5zXM2XOm2IpAeAiFfMCdy', 'user3@msb.inc', 0, 2);

CREATE TABLE shops (
	shop_id INT NOT NULL AUTO_INCREMENT,
	shop_name varchar(255),
	shop_address varchar(255) NOT NULL,
	shop_description varchar(255),
	shop_image varchar(255),
	website varchar(255),
	phone varchar(255),
	shop_email varchar(255),
	donate BOOLEAN DEFAULT 0,
	led_lights BOOLEAN DEFAULT 0,
	small_biz BOOLEAN DEFAULT 0,
	min_biz BOOLEAN DEFAULT 0,
	wo_biz BOOLEAN DEFAULT 0,
	latitude DECIMAL(9,5) NOT NULL,
	longitude DECIMAL(9,5) NOT NULL,
	
	PRIMARY KEY (shop_id)
);

INSERT INTO shops (shop_name, shop_address, shop_description, shop_image, website, phone, shop_email, donate, led_lights, small_biz, min_biz, wo_biz, latitude, longitude)
VALUES
('Laser', 'Carrer del Dr. Dou, 2, 08001 Barcelona', 'Shop One is the Number One', 'https://img.freepik.com/premium-vector/shop-market-store-front-exterior-facade-illustration-sity-space-background_175838-852.jpg?w=2000', 'https://shopone.com', '12345678', 'shopone@one.com', 0, 0, 0, 0, 0, 41.38228037671287, 2.1693529361821065),
('Humana', 'C/ de Mallorca, 592, 08026 Barcelona','Shop Two is still Number One', 'https://img.freepik.com/premium-vector/shop-market-store-front-exterior-facade-illustration-sity-space-background_175838-852.jpg?w=2000', 'https://shoptwo.com', '87654321', 'shoptwo@one.com', 0, 0, 0, 0, 0, 41.41072516726371, 2.184927150041393),
('Syra Cafe', 'Carrer de Londres, 100, 08036 Barcelona','Shop Three is still Number One', 'https://img.freepik.com/premium-vector/shop-market-store-front-exterior-facade-illustration-sity-space-background_175838-852.jpg?w=2000', 'https://shopthree.com', '87654322', 'shopthree@one.com', 0, 0, 0, 0, 0, 41.394116117800166, 2.1515154467882596);

CREATE TABLE `products` (
	`product_id` INT NOT NULL AUTO_INCREMENT,
	`product_name` varchar(255) NOT NULL,
	-- `shop_address` varchar(255) NOT NULL,
	`price` FLOAT NOT NULL,
	`product_image` varchar(255) NOT NULL,
	`product_quantity` INT NOT NULL,
	`product_description` varchar(255) NOT NULL,
	`stripe_product_id` varchar(255),
	`shop_id` INT NOT NULL,
	`recycled` BOOLEAN DEFAULT 0,
  `no_fridge` BOOLEAN DEFAULT 0,
  `fair_trade` BOOLEAN DEFAULT 0,
  `local` BOOLEAN DEFAULT 0,
  `organic` BOOLEAN DEFAULT 0,
	PRIMARY KEY (`product_id`)
);


INSERT INTO products (product_name, price, product_image, product_quantity, product_description, stripe_product_id, shop_id, recycled, no_fridge, fair_trade, `local`, organic)
VALUES
('Coffee', 5.99, 'coffee.jpg', 20, 'Coffee brewed and served fresh in-store', 'price_1M44bEBIwndE5957lW1avj2o', 1, 1, 0, 1, 1, 1),
('Sunglasses', 10.99, 'Sunglasses.jpeg', 10, 'Defend yourself from all that shade you be getting wearing these babies', 'price_1M49GDBIwndE5957XZPxGANH', 2, 0, 1, 0, 0, 0),
('Camera', 59.99, 'Camera.jpeg', 50, 'The best camera around', 'price_1M49HEBIwndE59571OqKQqvk', 2, 0, 1, 0, 0, 0),
('Scarf', 30.99, 'Scarf.jpeg', 100, 'Scarf to keep you warm', 'price_1M44dEBIwndE5957Cait0D15', 1, 1, 1, 1, 1, 1),
('Luxury Belt', 500.99, 'LVbelt.jpeg', 50, 'LV belt, if you have money coming out of your ears', 'price_1M44eiBIwndE5957FrOiJum7', 1, 0, 1, 0, 0, 0);


CREATE TABLE `purchases` (
	`purchase_id` INT NOT NULL AUTO_INCREMENT,
	`purchase_date` DATETIME DEFAULT CURRENT_TIMESTAMP,
	`purchase_sum` FLOAT NOT NULL,
	`user_id` INT NOT NULL,
	PRIMARY KEY (`purchase_id`)
);

INSERT INTO purchases ( purchase_sum, user_id)
VALUES
(5.99, 1),
(100.99, 1),
(59.99, 2);

CREATE TABLE `purchased_items` (
	`purchased_items_id` INT NOT NULL AUTO_INCREMENT,
	`purchase_quantity` INT NOT NULL,
	`purchase_points` INT,
	`purchase_id` INT NOT NULL,
	`product_id` INT NOT NULL,
	`shop_id` INT NOT NULL,
	PRIMARY KEY (`purchased_items_id`)
);

INSERT INTO purchased_items (purchase_quantity, purchase_points, purchase_id, product_id, shop_id)
VALUES
(1, 4, 1, 1, 1),
(10, 2, 2, 2, 2),
(1, 2, 3, 3, 2);

ALTER TABLE `users` ADD CONSTRAINT `users_fk0` FOREIGN KEY (`shop_id`) REFERENCES `shops`(`shop_id`);

ALTER TABLE `products` ADD CONSTRAINT `products_fk0` FOREIGN KEY (`shop_id`) REFERENCES `shops`(`shop_id`);

ALTER TABLE `purchases` ADD CONSTRAINT `purchases_fk0` FOREIGN KEY (`user_id`) REFERENCES `users`(`user_id`);

ALTER TABLE `purchased_items` ADD CONSTRAINT `purchased_items_fk0` FOREIGN KEY (`purchase_id`) REFERENCES `purchases`(`purchase_id`);

ALTER TABLE `purchased_items` ADD CONSTRAINT `purchased_items_fk1` FOREIGN KEY (`product_id`) REFERENCES `products`(`product_id`);

ALTER TABLE `purchased_items` ADD CONSTRAINT `purchased_items_fk2` FOREIGN KEY (`shop_id`) REFERENCES `shops`(`shop_id`);

SET FOREIGN_KEY_CHECKS=1;


