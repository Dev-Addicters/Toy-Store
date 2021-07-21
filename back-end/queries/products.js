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
            return await db.one("INSERT INTO inv_products (name, price, image, category, isNEW) VALUES ($1, $2, $3, $4, $5) RETURNING *", [items.name, items.price, items.image, items.category, items.isNEW]);

        return await db.tx(t => {
            const queries = items.map(item => db.one("INSERT INTO inv_products (name, price, image, category, isNEW) VALUES ($1) RETURNING *", [item.name, item.price, item.image, item.category, item.isNEW]));
            return t.batch(queries);
        })
    } catch (err) {
        return "error";
    }
}

const updateProducts = async (ids, items) => {
    try {
        if (!ids.includes(","))
            return await db.one("UPDATE inv_products SET name=$1, price=$2, image=$3, category=$4, isNEW=$5 WHERE id=$6 RETURNING *", [items.name, items.price, items.image, items.category, items.isNEW, ids]);

        return await db.tx(t => {
            const queries = ids.split(",").map((id, i) => db.one("UPDATE inv_products SET name=$1, price=$2, image=$3, category=$4, isNEW=$5 WHERE id=$6 RETURNING *", [items[i].name, items[i].price, items[i].image, items[i].category, items[i].isNEW, ids]));
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
