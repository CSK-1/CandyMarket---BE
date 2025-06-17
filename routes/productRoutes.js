import express from "express";
import { getProducts, getProduct } from "../db/queries/products.js";

const router = express.Router();
router.use(express.json());

function isValidId(id) {
	const num = Number(id);
	return Number.isInteger(num) && num > 0;
}

router.get("/products", async (req, res, next) => {
	const products = await getProducts();
	res.send(products);
});

router.get("/products/:id", async (req, res, next) => {
	const id = Number(req.params.id);

	if (!isValidId(id)) {
		return res.status(400).send({ error: "ID must be a positive integer" });
	}

	const product = await getProduct(id);

	if (!product) {
		return res.status(404).send({ error: "Product not found" });
	}

	res.send(product);
});

export default router;