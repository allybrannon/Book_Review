CREATE table books (
    id serial primary key,
    book_name TEXT,
    book_author TEXT
   
);
CREATE TABLE users (
    id serial primary key,
    name TEXT,
    email TEXT
    
);
CREATE TABLE reviews (
    id serial primary key,
    users_id INT REFERENCES users(id),
    stars INT
    CHECK (stars >= 1 and stars <= 5),
    title TEXT,
    review TEXT,
    books_id INT REFERENCES books(id)
);