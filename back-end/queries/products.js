const db = require("../db/dbConfig");

const getAllProducts = async () => {
    try {
        return await db.any("SELECT * FROM inv_products");
    } catch (err) {
        return "error";
    }
}

const getOneProduct = async (id) => {
    try {
        return await db.one("SELECT * FROM inv_products WHERE id=$1", id);
    } catch (err) {
        return "error";
    }
}

const createProduct = async (item) => {
    try {
        return await db.one("INSERT INTO inv_products (name) VALUES ($1) RETURNING *", item.name);
    } catch (err) {
        return "error";
    }
}

const updateProduct = async (id, item) => {
    try {
        return await db.one("UPDATE inv_products SET name=$1 WHERE id=$2 RETURNING *", [item.name, id]);
    } catch (err) {
        return "error";
    }
}

const deleteProduct = async (id) => {
    try {
        return await db.one("DELETE FROM inv_products WHERE id=$1 RETURNING *", id);
    } catch (err) {
        return "error";
    }
}

module.exports = {
    getAllProducts,
    getOneProduct,
    createProduct,
    updateProduct,
    deleteProduct
}
