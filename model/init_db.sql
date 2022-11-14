DROP TABLE IF EXISTS users;
CREATE TABLE users (
    user_id INT NOT NULL AUTO_INCREMENT,
    username VARCHAR(30) NOT NULL UNIQUE,
    password VARCHAR (200) NOT NULL,
    user_email VARCHAR(200) NOT NULL,
    user_points INT DEFAULT 0,
    shop_id INT,
    PRIMARY KEY (user_id)
);

INSERT INTO users (username, password, user_email, user_points, shop_id)
VALUES 
 ('user1-buyer', 'pass1', 'buyer1@msb.inc', 0, null),
 ('user2-seller', 'pass2', 'seller1@msb.inc', 0, 1),
 ('user3-seller', 'pass3', 'seller1@msb.inc', 0, 2);


DROP TABLE IF EXISTS shops;
CREATE TABLE shops (
	shop_id INT NOT NULL AUTO_INCREMENT,
	shop_name varchar(255) NOT NULL,
	shop_address varchar(255) NOT NULL UNIQUE,
	shop_description varchar(255) NOT NULL,
	shop_image varchar(255) NOT NULL,
	website varchar(255),
	phone varchar(255),
	shop_email varchar(255),
	shop_points INT,
    PRIMARY KEY (shop_id)
);

INSERT INTO shops (shop_name, shop_address, shop_description, shop_image, website, phone, shop_email, shop_points)
VALUES
('Shop One', 'Shop One Address', 'Shop One is the Number One', 'https://img.freepik.com/premium-vector/shop-market-store-front-exterior-facade-illustration-sity-space-background_175838-852.jpg?w=2000', 'https://shopone.com', '12345678', 'shopone@one.com', 100),
('Shop Two', 'Shop Two Address', 'Shop Two is still Number One', 'https://img.freepik.com/premium-vector/shop-market-store-front-exterior-facade-illustration-sity-space-background_175838-852.jpg?w=2000', 'https://shoptwo.com', '87654321', 'shoptwo@one.com', 0);
