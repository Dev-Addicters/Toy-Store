const getAllProductsQuery = ({ search, category, isNew, sortBy, order }) => {
    let qString = "SELECT * FROM inv_products";
    const qParams = [];

    if (search) {
        qParams.push(`%${search}%`);
        qString += ` WHERE name ILIKE $${qParams.length}`;
    }

    if (category) {
        qParams.push(`%${category}%`);
        qString += `${qString.includes("WHERE") ? " AND" : " WHERE"} category ILIKE $${qParams.length}`;
    }

    isNew = isNew?.toUpperCase();
    if (isNew === "TRUE" || isNew === "FALSE") {
        qString += `${qString.includes("WHERE") ? " AND" : " WHERE"} is_new=${isNew}`;
    }

    const columns = ["id", "name", "category", "price"];
    sortBy = sortBy?.toLowerCase();
    order = order?.toUpperCase();
    if (columns.includes(sortBy)) {
        qString += ` ORDER BY ${sortBy} ${order === "ASC" || order === "DESC" ? order : "ASC"}`;
    }

    return { qString, qParams };
}

const updateProductsQuery = (ids, data) => {
    const constructQuery = (id, item) => {
        let qString = "UPDATE inv_products SET";
        const qParams = [];

        const params = ["name", "price", "image", "category", "quantity", "is_new"];
        for (const key in item) {
            if (params.includes(key)) {
                qParams.push(item[key]);
                qString += `${qParams.length > 1 ? "," : ""} ${key}=${key === "quantity" ? "quantity+" : ""}$${qParams.length}`;
            }
        }

        qParams.push(id);
        qString += ` WHERE id=$${qParams.length} RETURNING *`;
        return { qString, qParams };
    }

    if (!ids.includes(",")) {
        if (data.length) {
            data = data[0];
        }
        return constructQuery(ids, data);
    }

    return ids.split(",").map((id, i) => constructQuery(id, data[i]));
}

module.exports = {
    getAllProductsQuery,
    updateProductsQuery
}
