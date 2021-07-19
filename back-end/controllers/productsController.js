const products = require("express").Router();
const { getAllProducts, getOneProduct, createProduct, updateProduct, deleteProduct } = require("../queries/products");

const dataVerification = (req, res, next) => {
    next();
}

products.get("/", async (req, res) => {
    const allItems = await getAllProducts();
    res.json(allItems);
})

products.get("/:id", async (req, res) => {
    const { id } = req.params;
    try {
        const item = await getOneProduct(id);
        if (!item.name) {
            console.log(`Invalid id request made with id ${id}`);
            throw `There is no item with id: ${id}`;
        }
        res.json(item);
    } catch (err) {
        res.status(404).json({ error: err });
    }
})

products.post("/", dataVerification, async (req, res) => {
    try {
        const newItem = await createProduct(req.body);
        if (!newItem.name) {
            console.log(`Error adding ${req.body} to database.`);
            throw `Error adding ${req.body} to database.`;
        }
        res.json(newItem);
    } catch (err) {
        res.status(404).json({ error: err });
    }
})

products.put("/:id", dataVerification, async (req, res) => {
    const { id } = req.params;
    try {
        const updatedItem = await updateProduct(id, req.body);
        if (!updatedItem.id) {
            console.log(`id has not found in database.`);
            throw `id has not found in database.`;
        }
        res.json(updatedItem);
    } catch (err) {
        res.status(404).json({ error: err });
    }
})

products.delete("/:id", async (req, res) => {
    const { id } = req.params;
    try {
        const deletedItem = await deleteProduct(id);
        if (!deletedItem.name) {
            console.log(`id has not found in database.`);
            throw `id has not found in database.`;
        }
        res.json(deletedItem);
    } catch (err) {
        res.status(404).json({ error: err });
    }
})

module.exports = products;