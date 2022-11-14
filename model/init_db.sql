SET FOREIGN_KEY_CHECKS=0;
DROP TABLE IF EXISTS users;
DROP TABLE IF EXISTS shops;
DROP TABLE IF EXISTS products;
DROP TABLE IF EXISTS purchases;
DROP TABLE IF EXISTS purchased_items;
SET FOREIGN_KEY_CHECKS=1;

CREATE TABLE `users` (
	`user_id` INT NOT NULL AUTO_INCREMENT,
	`username` varchar(30) NOT NULL UNIQUE,
	`password` varchar(100) NOT NULL,
	`email` varchar(100) NOT NULL,
	`user_points` INT,
	`shop_id` INT,
	PRIMARY KEY (`user_id`)
);

CREATE TABLE `shops` (
	`shop_id` INT NOT NULL AUTO_INCREMENT,
	`shop_name` varchar(255) NOT NULL,
	`shop_address` varchar(255) NOT NULL UNIQUE,
	`shop_description` varchar(255) NOT NULL,
	`shop_image` varchar(255) NOT NULL,
	`website` varchar(255),
	`phone` varchar(255),
	`shop_email` varchar(255),
	`shop_points` INT,
	PRIMARY KEY (`shop_id`)
);

INSERT INTO shops (shop_name, shop_address, shop_description, shop_image, website, phone, shop_email, shop_points)
VALUES
('Shop One', 'Shop One Address', 'Shop One is the Number One', 'https://img.freepik.com/premium-vector/shop-market-store-front-exterior-facade-illustration-sity-space-background_175838-852.jpg?w=2000', 'https://shopone.com', '12345678', 'shopone@one.com', 100),
('Shop Two', 'Shop Two Address', 'Shop Two is still Number One', 'https://img.freepik.com/premium-vector/shop-market-store-front-exterior-facade-illustration-sity-space-background_175838-852.jpg?w=2000', 'https://shoptwo.com', '87654321', 'shoptwo@one.com', 0);

CREATE TABLE `products` (
	`product_id` INT NOT NULL AUTO_INCREMENT,
	`product_name` varchar(255) NOT NULL,
	`price` FLOAT NOT NULL,
	`product_image` varchar(255) NOT NULL,
	`product_quantity` INT NOT NULL,
	`product_description` varchar(255) NOT NULL,
	`stripe_product_id` varchar(255),
	`shop_id` INT NOT NULL,
	PRIMARY KEY (`product_id`)
);

INSERT INTO products (product_name, price, product_image, product_quantity, product_description, shop_id)
VALUES 
('Coffee', 5.99, 'https://www.tastingtable.com/img/gallery/coffee-brands-ranked-from-worst-to-best/l-intro-1645231221.jpg', 20, 'Coffee brewed and served fresh in-store', 'price_1M44bEBIwndE5957lW1avj2o', 1),
('Sunglasses', 10.99, 'https://images.unsplash.com/photo-1577803645773-f96470509666?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxzZWFyY2h8M3x8c3VuZ2xhc3Nlc3xlbnwwfHwwfHw%3D&w=1000&q=80', 10, 'Defend yourself from all that shade you be getting wearing these babies', 'price_1M49GDBIwndE5957XZPxGANH', 2),
('Camera', 59.99, 'https://t3.ftcdn.net/jpg/00/79/36/04/360_F_79360425_13tH0FGR7nYTNlXWKOWtLmzk7BAikO1b.jpg', 50, 'The best camera around', 'price_1M49HEBIwndE59571OqKQqvk', 2);

CREATE TABLE `purchases` (
	`purchase_id` INT NOT NULL AUTO_INCREMENT,
	`purchase_date` DATETIME NOT NULL,
	`purchase_sum` FLOAT NOT NULL,
	`user_id` INT NOT NULL,
	PRIMARY KEY (`purchase_id`)
);

CREATE TABLE `purchased_items` (
	`purchased_items_id` INT NOT NULL AUTO_INCREMENT,
	`purchase_quantity` INT NOT NULL,
	`purchase_id` INT NOT NULL,
	`product_id` INT NOT NULL,
	`shop_id` INT NOT NULL,
	PRIMARY KEY (`purchased_items_id`)
);

ALTER TABLE `users` ADD CONSTRAINT `users_fk0` FOREIGN KEY (`shop_id`) REFERENCES `shops`(`shop_id`);

ALTER TABLE `products` ADD CONSTRAINT `products_fk0` FOREIGN KEY (`shop_id`) REFERENCES `shops`(`shop_id`);

ALTER TABLE `purchases` ADD CONSTRAINT `purchases_fk0` FOREIGN KEY (`user_id`) REFERENCES `users`(`user_id`);

ALTER TABLE `purchased_items` ADD CONSTRAINT `purchased_items_fk0` FOREIGN KEY (`purchase_id`) REFERENCES `purchases`(`purchase_id`);

ALTER TABLE `purchased_items` ADD CONSTRAINT `purchased_items_fk1` FOREIGN KEY (`product_id`) REFERENCES `products`(`product_id`);

ALTER TABLE `purchased_items` ADD CONSTRAINT `purchased_items_fk2` FOREIGN KEY (`shop_id`) REFERENCES `shops`(`shop_id`);





