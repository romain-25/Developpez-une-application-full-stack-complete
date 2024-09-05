-- Create table for User
CREATE TABLE IF NOT EXISTS user (
    id INT AUTO_INCREMENT PRIMARY KEY,
    username VARCHAR(255) NOT NULL,
    email VARCHAR(255) NOT NULL,
    password VARCHAR(255) NOT NULL
);

-- Create table for Theme
CREATE TABLE IF NOT EXISTS theme (
    id INT AUTO_INCREMENT PRIMARY KEY,
    name VARCHAR(255) NOT NULL,
    content TEXT NOT NULL
);

-- Create table for Article
CREATE TABLE IF NOT EXISTS article (
    id INT AUTO_INCREMENT PRIMARY KEY,
    title VARCHAR(255) NOT NULL,
    content TEXT NOT NULL,
    theme_id INT,
    author_id INT,
    published_date date
);
-- Create table for Comment
CREATE TABLE IF NOT EXISTS comment (
id INT AUTO_INCREMENT PRIMARY KEY,
content TEXT NOT NULL,
author_id INT,
article_id INT,
created_at date
);
-- Create table for Subscriptions (many-to-many relationship between users and themes)
CREATE TABLE IF NOT EXISTS user_theme_subscription (
    user_id INT,
    theme_id INT,
    PRIMARY KEY (user_id, theme_id)
);

-- Insert the user with id 1
INSERT INTO user (id, username, email, password) VALUES
(1, 'romain', 'romain@mdd.fr', '$2b$12$dJwZlfkrOJXaAWRXPNXMP.n2GcdZY9KgEJT.TIbu7RoYq/ciahG4q');

-- Insert themes
INSERT INTO theme (name, content) VALUES
('Java', 'Lorem ipsum dolor sit amet, Java theme content.'),
('Python', 'Lorem ipsum dolor sit amet, Python theme content.'),
('Angular', 'Lorem ipsum dolor sit amet, Angular theme content.'),
('C sharp', 'Lorem ipsum dolor sit amet, C sharp theme content.');

-- Insert articles for each theme
INSERT INTO article (title, content, theme_id, author_id, published_date) VALUES
('Java Article 1', 'Lorem ipsum dolor sit amet, article content 1.', (SELECT id FROM theme WHERE name = 'Java'),1, CURDATE()),
('Java Article 2', 'Lorem ipsum dolor sit amet, article content 2.', (SELECT id FROM theme WHERE name = 'Java'),1, CURDATE()),
('Java Article 3', 'Lorem ipsum dolor sit amet, article content 3.', (SELECT id FROM theme WHERE name = 'Java'),1, CURDATE()),
('Python Article 1', 'Lorem ipsum dolor sit amet, article content 1.', (SELECT id FROM theme WHERE name = 'Python'),1, CURDATE()),
('Python Article 2', 'Lorem ipsum dolor sit amet, article content 2.', (SELECT id FROM theme WHERE name = 'Python'),1, CURDATE()),
('Python Article 3', 'Lorem ipsum dolor sit amet, article content 3.', (SELECT id FROM theme WHERE name = 'Python'),1, CURDATE()),
('Angular Article 1', 'Lorem ipsum dolor sit amet, article content 1.', (SELECT id FROM theme WHERE name = 'Angular'),1, CURDATE()),
('Angular Article 2', 'Lorem ipsum dolor sit amet, article content 2.', (SELECT id FROM theme WHERE name = 'Angular'),1, CURDATE()),
('Angular Article 3', 'Lorem ipsum dolor sit amet, article content 3.', (SELECT id FROM theme WHERE name = 'Angular'),1, CURDATE()),
('C sharp Article 1', 'Lorem ipsum dolor sit amet, article content 1.', (SELECT id FROM theme WHERE name = 'C sharp'),1, CURDATE()),
('C sharp Article 2', 'Lorem ipsum dolor sit amet, article content 2.', (SELECT id FROM theme WHERE name = 'C sharp'),1, CURDATE()),
('C sharp Article 3', 'Lorem ipsum dolor sit amet, article content 3.', (SELECT id FROM theme WHERE name = 'C sharp'),1, CURDATE());

-- Insert comment in articles
INSERT INTO comment (content, author_id, article_id, created_at) VALUES
('Lorem ipsum dolor sit amet, comment content 1.', 1,1, CURDATE()),
('Lorem ipsum dolor sit amet, comment content 1.', 1,2, CURDATE()),
('Lorem ipsum dolor sit amet, comment content 1.', 1,3, CURDATE()),
('Lorem ipsum dolor sit amet, comment content 1.', 1,4, CURDATE()),
('Lorem ipsum dolor sit amet, comment content 1.', 1,5, CURDATE()),
('Lorem ipsum dolor sit amet, comment content 1.', 1,6, CURDATE()),
('Lorem ipsum dolor sit amet, comment content 1.', 1,7, CURDATE()),
('Lorem ipsum dolor sit amet, comment content 1.', 1,8, CURDATE()),
('Lorem ipsum dolor sit amet, comment content 1.', 1,9, CURDATE()),
('Lorem ipsum dolor sit amet, comment content 1.', 1,10, CURDATE()),
('Lorem ipsum dolor sit amet, comment content 1.', 1,11, CURDATE()),
('Lorem ipsum dolor sit amet, comment content 1.', 1,12, CURDATE());

-- Subscribe the user with id 1 to the Java and Angular themes
INSERT INTO user_theme_subscription (user_id, theme_id) VALUES
(1, (SELECT id FROM theme WHERE name = 'Java')),
(1, (SELECT id FROM theme WHERE name = 'Angular'));
