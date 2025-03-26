CREATE TABLE medicines (
    id SERIAL PRIMARY KEY,
    name TEXT NOT NULL,
    price VARCHAR(100) NOT NULL,
    is_discontinued VARCHAR(50) NOT NULL,
    manufacturer_name VARCHAR(100) NOT NULL,
    type TEXT NOT NULL,
    pack_size_label TEXT NOT NULL,
    short_composition1 TEXT NOT NULL,
    short_composition2 TEXT NULL 
);
CREATE TABLE users (
	id SERIAL PRIMARY KEY NOT NULL UNIQUE,
	name VARCHAR(100) NOT NULL,
	email_id TEXT NOT NULL UNIQUE,
	password TEXT NOT NULL
);
CREATE TABLE orders(
	id SERIAL PRIMARY KEY UNIQUE NOT NULL,
	med_name TEXT NOT NULL,
	price VARCHAR(100) NOT NULL,
	user_id INTEGER REFERENCES users(id)
);