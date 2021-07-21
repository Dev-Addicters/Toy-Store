const getAllProductsQuery = ({ search, category, isNew, sortBy, order }) => {
    let qString = "SELECT * FROM inv_products";
    const qParams = [];

    if (search) {
        qParams.push(`%${search}%`)
        qString += ` WHERE name ILIKE $${qParams.length}`;
    }

    if (category) {
        qParams.push(`%${category}%`);
        qString += `${qString.includes("WHERE") ? " AND" : " WHERE"} category ILIKE $${qParams.length}`;
    }

    isNew = isNew?.toUpperCase();
    if (isNew === "TRUE" || isNew === "FALSE") {
        qString += `${qString.includes("WHERE") ? " AND" : " WHERE"} isNEW=${isNew}`;
    }

    const columns = ["id", "name", "category", "price"];
    sortBy = sortBy?.toLowerCase();
    order = order?.toUpperCase();
    if (columns.includes(sortBy)) {
        qString += ` ORDER BY ${sortBy} ${order === "ASC" || order === "DESC" ? order : "ASC"}`;
    }

    // console.log("QUERY Made: ", qString + ",", qParams); log this in server?
    return { qString, qParams };
}

module.exports = {
    getAllProductsQuery
}
