DROP TABLE IF EXISTS users;
CREATE TABLE users (
    user-id INT NOT NULL PRIMARY KEY AUTO_INCREMENT,
    shop-id INT,
    username VARCHAR(255),
    user-email VARCHAR(255),
    user-points INT DEFAULT 0,
);

INSERT INTO users (user-id, shop-id, username, user-email, user-points)
VALUES 
 (1, null, buyer1, buyer1@msb.inc, 0)
 (2, 1, seller1, seller1@msb.inc, 0);