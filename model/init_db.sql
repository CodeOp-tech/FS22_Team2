SET FOREIGN_KEY_CHECKS=0;
DROP TABLE IF EXISTS users;
DROP TABLE IF EXISTS shops;
DROP TABLE IF EXISTS products;
DROP TABLE IF EXISTS purchases;
DROP TABLE IF EXISTS purchased_items;
DROP TABLE IF EXISTS reviews;


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
('Laser1', '$2b$12$eFzMWbS9SogNtxkmo3J7aO8FQMFQSKbtpwLMIOVsF6GGKpTQdgq.W', 'laser@laser.com', 5, 1),
('Humana2', '$2b$12$WZcGPyrkCvD5e8m0Qz/nFOdBryUcsp6uDlE2MDo/AjuBhPrQBCfI6', 'humana@humana.com', 5, 2),
('Syra3', '$2b$12$tiAz4eaXlpU.CdltUVvw6udLA2BWsitk5zXM2XOm2IpAeAiFfMCdy', 'syra@syra.com', 0, 3),
('Ametller4', '$2a$12$rTpFBHzeSn8FA7R.zcCjXuDQuXii95g1B44tCuIsSYresWMe7r5rO','ametller@ametller.com', 0, 4),
('Fancy5', '$2a$12$jObuFB7MCmCyyCZ4LFiS7u9qZpfgkHo3KNs5OtiVet3spSAcdvhxq','fancy@fancy.com', 0, 5),
('Amore6', '$2a$12$3WHjduMkESy4T5jnJS2nYu7JfM7GnAHM3ZRRDNLDAUePJj4oRCDW2','amore@amore.com', 0, 6),
('Zoe7', '$2a$12$ONn2m7Z5qDy3GNloPQhfAeegAvmum99ZKjDk4lehVrnI6QHfmTKge','zoe@msb.inc', 10, null),
('Megan8', '$2a$12$Cr4Rn6hil7a3AWALxXanRutwL8giOzOZK5vmBeXxVuAs0/PKM7kYi','megan@msb.inc', 10, null),
('Kejal9', '$2a$12$J57jfg1/ZW6Ae4aOnSij8ep6q4VQ6ViBz8BAOaKYKAvIkPlyynELG','kj@msb.inc', 9, null),
('Jess10', '$2a$12$eXmCgUR.AdQ.VxFrJT2UKeS/LCapVlZRL.6kDBAygcvBR45lFASoe','jess@msb.inc', 10, null);

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
('Laser', 'Carrer del Dr. Dou, 2, 08001 Barcelona', 'We try to convey with each collection all these local concepts that may seem invisible to any citizen.', 'https://cdn.shopify.com/s/files/1/0449/4613/files/5_064da9be-c43a-48f5-9a11-f175a1e46095_grande.JPG?v=1552569309', 'https://laser.com', '12345678', 'laser@laser.com', 1, 1, 1, 0, 0, 41.38228037671287, 2.1693529361821065),
('Humana', 'C/ de Mallorca, 592, 08026 Barcelona','Improve the living conditions of the most disadvantaged communities on the planet and facilitate their economic and social progress. Promote the circular economy.', 'https://welovesecondhand.files.wordpress.com/2021/06/humana-moda-secondhand-vintage-segunda-mano-barcelona-general-alvarez-de-castro.jpg?w=676', 'https://humana.com', '87654321', 'humana@humana.com', 0, 0, 1, 0, 1, 41.41072516726371, 2.184927150041393),
('Syra Cafe', 'Carrer de Londres, 100, 08036 Barcelona','Coffee: ...because you know you need it', 'https://cdn.shopify.com/s/files/1/0299/2046/0884/files/gracia.png?v=1653134456', 'https://syracafe.com', '87654322', 'syra@syra.com', 1, 1, 1, 1, 1, 41.394116117800166, 2.1515154467882596),
('Ametller', 'C. del Comte Borrell, 71, 08015 Barcelona', 'For all your grocery needs', 'https://img.freepik.com/free-photo/fresh-fruit-stalls-san-miguel-market_53876-146829.jpg?size=626&ext=jpg&ga=GA1.2.1076301059.1668595321&semt=sph', 'https://amettler.com','87654323','ametller@ametller.com', 0, 1, 0, 1, 0, 41.396292556086514, 2.1660198146854333),
('Fancy', 'Passeig del Migdia, 08038 Barcelona', 'We only do luxe', 'http://cms.luxurysociety.com/media/original_images/_3239_miumiunewbondstreet_2-1_original_SQKVTDC.jpg', 'https://fancy.com','43215678','fancy@fancy.com', 0, 0, 0, 0, 0, 41.365401, 2.166184);


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
	`total_product_points` INT,
    PRIMARY KEY (`product_id`)
);

INSERT INTO products (product_name, price, product_image, product_quantity, product_description, stripe_product_id, shop_id, recycled, no_fridge, fair_trade, `local`, organic, total_product_points)
VALUES
('Cap', 22.90, 'LaserCap.jpeg', 100, 'Caps for every style and season', 'price_1M7OkEBIwndE5957BA27qJ0W', 1, 1, 1, 1, 1, 1, 5),
('Shirt', 35.00, 'LaserShirt.jpeg', 50, 'Heartbreaker shirts', 'price_1M7OmZBIwndE5957EFWdmtdS', 1, 0, 1, 0, 1, 1, 3),
('Socks', 11.50, 'LaserSocks.jpeg', 200, 'Keep those toesies safe', 'price_1M7OojBIwndE5957Sqtlqa58', 1, 0, 1, 0, 0, 0, 1),
('Hoodie', 99.00, 'LaserHoodie.jpeg', 10, 'Only for the cool kids', 'price_1M7OqwBIwndE5957FXt7yuZV', 1, 0, 1, 0, 0, 1, 2),
('Shorts', 32.00, 'LaserShorts.jpeg', 80, 'For your day-to-day wear', 'price_1M7OsSBIwndE5957gBgfF5Eb', 1, 1, 1, 0, 0, 1, 3),
('Hat', 28.80, 'LaserCord.jpeg', 500, 'Style yourself up with this sweet fabric hat', 'price_1M7OuzBIwndE5957wTZYLx3J', 1, 0, 1, 0, 0, 0, 1),
('Hoodie', 80.80, 'HumanaHoodieSet.jpeg', 50, 'Feel like an absolute beast in this set', 'price_1M7P4aBIwndE5957YszgSQPw', 2, 0, 0, 1, 1, 0, 2),
('Scarf', 29.50, 'CrochetScarf.jpeg', 100, 'Scarf to keep you warm', 'price_1M44dEBIwndE5957Cait0D15', 2, 0, 1, 1, 1, 1, 4),
('Sunglasses', 10.99, 'shades.jpeg', 10, 'Defend yourself from all that shade you be getting wearing these babies', 'price_1M49GDBIwndE5957XZPxGANH', 2, 0, 1, 0, 0, 0, 1),
('Coffee', 5.99, 'coffee.jpg', 100, 'Coffee brewed and served fresh in-store', 'price_1M44bEBIwndE5957lW1avj2o', 3, 0, 0, 1, 1, 1, 3),
('Latte', 7.99, 'SyraLatte.jpeg', 80, 'Latte, batte, schmatte', 'price_1M7P9OBIwndE59574ydbAIho', 3, 0, 0, 1, 1, 1, 3),
('Apples', 2.99, 'apples.jpeg', 220, 'You know what they say, an apple a day keeps the bad juju away', 'price_1M7PBoBIwndE5957r1gzyYzy', 4, 0, 0, 1, 1, 1, 3),
('Tomatoes', 5.00, 'tomatoes.jpeg', 300, 'Red red red tomatoes', 'price_1M7PGlBIwndE5957zWTPhXbj', 4, 0, 0, 1, 1, 1, 3),
('Oranges', 3.20, 'oranges.jpeg', 180, 'Get your dose of vitamin C', 'price_1M7PE6BIwndE5957hUV15Jmt', 4, 0, 0, 0, 1, 1, 2),
('Camera', 399.99, 'Camera.jpeg', 50, 'The best camera around, we only sell authentic luxe cameras', 'price_1M49HEBIwndE59571OqKQqvk', 5, 0, 1, 0, 0, 0, 1),
('Belt', 500.99, 'LVbelt.jpeg', 30, 'LV belt, if you have money coming out of your ears #justsaying', 'price_1M44eiBIwndE5957FrOiJum7', 5, 0, 1, 0, 0, 0, 1),
('Book', 1290.90, 'AntiqueBook.jpeg', 1, 'Absolutely one of a kind, rare, antique book dating back from the 1800s', 'price_1M44eiBIwndE5957FrOiJum7', 5, 0, 1, 0, 0, 0, 1),
('Vase', 250.00, 'Vase.jpeg', 10, 'Handblown and handcrafted to exquisite perfection', 'price_1M7QCCBIwndE5957i3qBTcW8', 5, 0, 1, 0, 0, 0, 1);

CREATE TABLE `purchases` (
	`purchase_id` INT NOT NULL AUTO_INCREMENT,
	`purchase_date` DATETIME DEFAULT CURRENT_TIMESTAMP,
	`purchase_sum` FLOAT NOT NULL,
	`user_id` INT NOT NULL,
	PRIMARY KEY (`purchase_id`)
);

INSERT INTO purchases ( purchase_sum, user_id)
VALUES
(61.10, 7), -- Zoe7 buys one Laser Cap, one Laser shirt and Amatller oranges
(115.00, 8), -- Megan8 buys 10 Laser socks 
(11.97, 9), -- Kejal9 buys 1 Syra Coffee 2 apples 
(519.19, 10), -- Jess10 buys 1 Laser short, 1 Humana hoodies, 2 bunches of Amatller oranges, 1 Fancy camera
(22.90, 1), -- Laser1 buys 1 Laser Cap
(22.90, 2); -- Humana2 buys 1 Laser Cap

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
(1, 5, 1, 1, 1), -- Zoe7 buys one Laser Cap 
(1, 3, 1, 2, 1), -- Zoe7 buys one Laser Shirt 
(1, 2, 1, 14, 4), -- Zoe7 buys one bunch of Amatller oranges
(10, 10, 2, 3, 1), -- Megan8 buys 10 Laser socks 
(1, 3, 3, 10, 3), -- Kejal9 buys 1 Syra Coffee 
(2, 6, 3, 12, 4), -- Kejal9 buys 2 apples 
(1, 3, 4, 5, 1), -- Jess10 buys 1 Laser short 
(1, 2, 4, 7, 2), -- Jess10 buys 1 Humana hoodie set 
(2, 4, 4, 14, 4), -- Jess10 buys 2 bunches of Amatller oranges 
(1, 1, 4, 15, 5), -- Jess10 buys 1 Fancy Camera 
(1, 5, 5, 1, 1), -- Laser1 buys 1 Laser Cap 
(1, 5, 6, 1, 1); -- Humana2 buys 1 Laser Cap 

CREATE TABLE `reviews` (
	`review_id` INT NOT NULL AUTO_INCREMENT,
	`review_date` DATETIME DEFAULT CURRENT_TIMESTAMP,
	`stars` INT,
	`review_title` varchar(255) NOT NULL,
	`review_body` varchar(255),
	`product_id` INT NOT NULL,
	`user_id` INT NOT NULL,
	PRIMARY KEY (`review_id`)
);

INSERT INTO reviews (stars, review_title, review_body, product_id, user_id)
VALUES
(4, 'On the fence about this cap but..', 'Ok so I thought this cap looked kind of goofy at first, but I grew into it and am really liking how it looks now', 1, 7),
(5, 'Laser always delivers!', 'Stylin, milin, all that is in', 1, 1),
(1, 'Not really my thing', 'Not for me, looked a bit weird in it', 1, 2),
(3, 'Socks are just socks', 'Got a whole bunch of socks... just to wear, you know', 3, 8),
(5, 'Hands down BEST ever coffee, period!', 'As a true coffee lover, I can attest to how absolutely delicious Syra Coffees are!', 10, 9),
(5, 'Amattler oranges', 'My go-to-snack, and Amattler always has the freshest oranges around!', 14, 7),
(5, 'These oranges changed my life, legit', 'Never fallen sick ever again', 14, 10);

ALTER TABLE `users` ADD CONSTRAINT `users_fk0` FOREIGN KEY (`shop_id`) REFERENCES `shops`(`shop_id`);

ALTER TABLE `products` ADD CONSTRAINT `products_fk0` FOREIGN KEY (`shop_id`) REFERENCES `shops`(`shop_id`);

ALTER TABLE `purchases` ADD CONSTRAINT `purchases_fk0` FOREIGN KEY (`user_id`) REFERENCES `users`(`user_id`);

ALTER TABLE `purchased_items` ADD CONSTRAINT `purchased_items_fk0` FOREIGN KEY (`purchase_id`) REFERENCES `purchases`(`purchase_id`);

ALTER TABLE `purchased_items` ADD CONSTRAINT `purchased_items_fk1` FOREIGN KEY (`product_id`) REFERENCES `products`(`product_id`);

ALTER TABLE `purchased_items` ADD CONSTRAINT `purchased_items_fk2` FOREIGN KEY (`shop_id`) REFERENCES `shops`(`shop_id`);

ALTER TABLE `reviews` ADD CONSTRAINT `reviews_fk0` FOREIGN KEY (`product_id`) REFERENCES `products`(`product_id`);

ALTER TABLE `reviews` ADD CONSTRAINT `reviews_fk1` FOREIGN KEY (`user_id`) REFERENCES `users`(`user_id`);

SET FOREIGN_KEY_CHECKS=1;


