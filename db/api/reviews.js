import express from "express";
import { verifyToken } from ".../app.js";
import { createReview, getReviewsByProduct } from "../queries/reviews.js";
import { getProduct } from "../queries/products.js";

const router = express.Router();
router.use(express.json());

function isValidId(id) {
	const num = Number(id);
	return Number.isInteger(num) && num > 0;
}

router.post("/products/:id/reviews", verifyToken, async (req, res, next) => {
	const id = Number(req.params.id);

	if (!isValidId(id)) {
		return res.status(400).send({ error: "ID must be a positive integer" });
	}

	const product = await getProduct(id);

	if (!product) {
		return res.status(404).send({ error: "Product not found" });
	}

	if (!req.body) {
		return res.status(400).send({ error: "Missing body" });
	}

	const { rating, comment, product_id } = req.body;

	if (!rating || !comment || product_id == null) {
		return res.status(400).send({ error: "Missing required fields" });
	}

	const newReview = await createReview({
		rating,
		comment,
		product_id: id,
	});

	res.status(201).send(newReview);
});

router.get("/products/:id/reviews", verifyToken, async (req, res, next) => {
	const product_id = Number(req.params.id);

	if (!isValidId(id)) {
		return res.status(400).send({ error: "ID must be a positive integer" });
	}

	const product = await getProduct(product_id);

	if (!product) {
		return res.status(404).send({ error: "Product not found" });
	}

	const reviews = await getReviewsByProduct(product_id);
	res.send(reviews);
});
