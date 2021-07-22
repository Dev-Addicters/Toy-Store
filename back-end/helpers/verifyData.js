const pass = { pass: true };
const notPass = (message) => ({ pass: false, error: `Invalid ${message}.` });

const nameCheckFailed = (n) => {
    return typeof n !== "string" || !n.trim();
}

const priceCheckFailed = (p) => {
    return typeof p !== "string" || !p.trim() || isNaN(p) || Number(p) <= 0;
}

const imageCheckFailed = (i) => {
    return typeof i !== "string" || i.length < 11 || (i.slice(0, 7) !== "http://" && i.slice(0, 8) !== "https://");
}

const categoryCheckFailed = (c) => {
    return typeof c !== "string";
}

const quantityCheckFailed = (q, allowNegative) => {
    if (typeof q !== "number")
        return true;

    if (!allowNegative) {
        if (q < 0)
            return true;
    }

    return false;
}

const isNewCheckFailed = (n) => {
    return typeof n !== "boolean";
}

const postCheck = (req, res, next) => {
    const verifyProduct = ({ name, price, image, category, quantity, is_new }) => {
        if (nameCheckFailed(name))
            return notPass("name");

        if (priceCheckFailed(price))
            return notPass("price");

        if (imageCheckFailed(image))
            return notPass("image link, it should begin with http:// or https://");

        if (categoryCheckFailed(category))
            return notPass("category");

        if (quantityCheckFailed(quantity, false))
            return notPass("quantity");

        if (isNewCheckFailed(is_new))
            return notPass("type, is_new");

        return pass;
    }

    if (!req.body.length) {
        const result = verifyProduct(req.body);
        return result.pass ? next() : res.status(400).json({ error: result.error });
    }

    for (let i = 0; i < req.body.length; i++) {
        const result = verifyProduct(req.body[i]);
        if (!result.pass)
            return res.status(400).json({ error: result.error, index: i });
    }

    next();
}

const putCheck = (req, res, next) => {
    const verifyProduct = (product) => {
        const { name, price, image, category, quantity, is_new } = product;
        const keys = Object.keys(product);
        let count = 0;
        if (keys.includes("name")) {
            if (nameCheckFailed(name))
                return notPass("name");

            count++;
        }

        if (keys.includes("price")) {
            if (priceCheckFailed(price))
                return notPass("price");

            count++;
        }

        if (keys.includes("image")) {
            if (imageCheckFailed(image))
                return notPass("image link, it should begin with http:// or https://");

            count++;
        }

        if (keys.includes("category")) {
            if (categoryCheckFailed(category))
                return notPass("category");

            count++;
        }

        if (keys.includes("quantity")) {
            if (quantityCheckFailed(quantity, true))
                return notPass("quantity");

            count++;
        }

        if (keys.includes("is_new")) {
            if (isNewCheckFailed(is_new))
                return notPass("type, is_new");

            count++;
        }

        return count > 0 ? pass : notPass("data, required data not found");
    }

    const { ids } = req.params;
    if (!ids.includes(",") && !req.body.length) {
        const result = verifyProduct(req.body);
        return result.pass ? next() : res.status(400).json({ error: result.error });
    }

    if (ids.split(",").length !== req.body.length)
        return res.status(400).json({ error: "Number of ids does not match number of inputs." });

    for (let i = 0; i < req.body.length; i++) {
        const result = verifyProduct(req.body[i]);
        if (!result.pass)
            return res.status(400).json({ error: result.error, index: i });
    }

    next();
}

module.exports = {
    postCheck,
    putCheck
}
