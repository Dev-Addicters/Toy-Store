DROP TABLE IF EXISTS inv_products;

CREATE TABLE inv_products (
    id SERIAL PRIMARY KEY, 
    name TEXT,
    price DECIMAL(10,2),
    image TEXT,
    category TEXT,
    quantity INTEGER,
    is_new BOOLEAN
);

/*
quantity 100 stretch
*/
