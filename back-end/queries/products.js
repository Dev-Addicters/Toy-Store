const db = require("../db/dbConfig");
const { getAllProductsQuery } = require("../helpers/setDbQuery");

const getAllProducts = async (objQuery) => {
    try {
        let dbQuery = getAllProductsQuery(objQuery);
        if (!dbQuery.qParams.length)
            return await db.any(dbQuery.qString);

        return await db.any(dbQuery.qString, dbQuery.qParams);
    } catch (err) {
        return "error";
    }
}

const getProducts = async (ids) => {
    try {
        if (!ids.includes(","))
            return await db.one("SELECT * FROM inv_products WHERE id=$1", ids);

        return await db.tx(t => {
            const queries = ids.split(",").map(id => db.one("SELECT * FROM inv_products WHERE id=$1", id));
            return t.batch(queries);
        })
    } catch (err) {
        return "error";
    }
}

const createProducts = async (items) => {
    try {
        if (!items.length)
            return await db.one("INSERT INTO inv_products (name) VALUES ($1) RETURNING *", items.name);

        return await db.tx(t => {
            const queries = items.map(item => db.one("INSERT INTO inv_products (name) VALUES ($1) RETURNING *", item.name));
            return t.batch(queries);
        })
    } catch (err) {
        return "error";
    }
}

const updateProducts = async (ids, items) => {
    try {
        if (!ids.includes(","))
            return await db.one("UPDATE inv_products SET name=$1 WHERE id=$2 RETURNING *", [items.name, ids]);

        return await db.tx(t => {
            const queries = ids.split(",").map((id, i) => db.one("UPDATE inv_products SET name=$1 WHERE id=$2 RETURNING *", [items[i].name, id]));
            return t.batch(queries);
        })
    } catch (err) {
        return "error";
    }
}

const deleteProducts = async (ids) => {
    try {
        if (!ids.includes(","))
            return await db.one("DELETE FROM inv_products WHERE id=$1 RETURNING *", ids);

        return await db.tx(t => {
            const queries = ids.split(",").map(id => db.one("DELETE FROM inv_products WHERE id=$1 RETURNING *", id));
            return t.batch(queries);
        })
    } catch (err) {
        return "error";
    }
}

module.exports = {
    getAllProducts,
    getProducts,
    createProducts,
    updateProducts,
    deleteProducts
}
