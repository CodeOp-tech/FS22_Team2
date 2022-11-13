DROP TABLE IF EXISTS users;
CREATE TABLE users (
    user_id INT NOT NULL PRIMARY KEY AUTO_INCREMENT,
    shop_id INT,
    username VARCHAR(30) NOT NULL UNIQUE,
    password VARCHAR (200) NOT NULL,
    user_email VARCHAR(200) NOT NULL,
    user_points INT DEFAULT 0
);

INSERT INTO `users` (user_id, shop_id, username, password, user_email, user_points)
VALUES 
 (1, null, 'user1-buyer', '$2b$12$eFzMWbS9SogNtxkmo3J7aO8FQMFQSKbtpwLMIOVsF6GGKpTQdgq.W', 'buyer1@msb.inc', 0),
 (2, 1, 'user2-seller', '$2b$12$WZcGPyrkCvD5e8m0Qz/nFOdBryUcsp6uDlE2MDo/AjuBhPrQBCfI6', 'seller1@msb.inc', 0);