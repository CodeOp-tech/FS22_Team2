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

-- CREATE TABLE cats(
--     id INT NOT NULL PRIMARY KEY AUTO_INCREMENT,
--     name VARCHAR(100),
--     video VARCHAR(100),
--     category VARCHAR(100)
-- );
-- INSERT INTO cats (id,  name, video, category)
-- VALUES (1, "beginner", "ploughStop","vTransition.mp4", "stops"),
-- (2, "intermediate", "tStop","tStop.mp4", "stops"),
-- (3, "advanced", "toeStop", "toeStop.mp4", "stops"),
-- (4, "beginner", "vTransition", "vTransition.mp4", "transitions"),
-- (5, "intermediate", "pivotTransition", "pivotTransition.mp4", "transitions"),
-- (6, "advanced", "manuelTransition", "manuelTransition.mp4", "transitions");
