DROP TABLE IF EXISTS inv_products CASCADE;

CREATE TABLE inv_products (
    id SERIAL PRIMARY KEY, 
    name TEXT,
    price DECIMAL(10,2),
    image TEXT,
    category TEXT,
    quantity INTEGER,
    CHECK (quantity >= 0),
    is_new BOOLEAN
);

DROP TABLE IF EXISTS item_reviews CASCADE;

CREATE TABLE item_reviews (
    id SERIAL PRIMARY KEY,
    reviewer TEXT,
    title TEXT,
    content TEXT,
    rating NUMERIC,
    CHECK (rating >= 0 AND rating <= 5),
    product_id INTEGER REFERENCES inv_products (id) ON DELETE CASCADE
);
