const db = require("../db/dbConfig");
const { getAllProductsQuery, updateProductsQuery } = require("../helpers/setDbQuery");

const getAllProducts = async (frontQuery) => {
    try {
        const dbQuery = getAllProductsQuery(frontQuery);
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
            return await db.one("INSERT INTO inv_products (name, price, image, category, quantity, is_new) VALUES ($1, $2, $3, $4, $5, $6) RETURNING *",
                [items.name, items.price, items.image, items.category, items.quantity, items.is_new]);

        return await db.tx(t => {
            const queries = items.map(item => db.one("INSERT INTO inv_products (name, price, image, category, quantity, is_new) VALUES ($1, $2, $3, $4, $5, $6) RETURNING *",
                [item.name, item.price, item.image, item.category, item.quantity, item.is_new]));
            return t.batch(queries);
        })
    } catch (err) {
        return "error";
    }
}

const updateProducts = async (ids, items) => {
    try {
        const dbQuery = updateProductsQuery(ids, items);
        if (!ids.includes(","))
            return await db.one(dbQuery.qString, dbQuery.qParams);

        return await db.tx(t => {
            const queries = dbQuery.map(q => db.one(q.qString, q.qParams));
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

        return await db.any(`DELETE FROM inv_products WHERE id IN (${ids}) RETURNING *`);
        // return await db.tx(t => {
        //     const queries = ids.split(",").map(id => db.one("DELETE FROM inv_products WHERE id=$1 RETURNING *", id));
        //     return t.batch(queries);
        // })
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
