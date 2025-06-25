import express from "express";
import authenticateToken from "../middlewares/authMiddleware.js";
import { createReview, getReviewsByProduct } from "../db/queries/reviews.js";
import { getProduct } from "../db/queries/products.js";

const router = express.Router();
router.use(express.json());

function isValidId(id) {
  const num = Number(id);
  return Number.isInteger(num) && num > 0;
}

// POST /products/:id/reviews
router.post("/products/:id/reviews", authenticateToken, async (req, res) => {
  const id = Number(req.params.id);

  if (!isValidId(id)) {
    return res.status(400).json({ error: "ID must be a positive integer" });
  }

  const product = await getProduct(id);
  if (!product) {
    return res.status(404).json({ error: "Product not found" });
  }

  const { rating, comment } = req.body;

  if (!rating || !comment) {
    return res.status(400).json({ error: "Missing required fields" });
  }

  const user_id = req.user.id;

  const newReview = await createReview({
    rating,
    comment,
    product_id: id,
    user_id,
  });

  res.status(201).json(newReview);
});

// GET /products/:id/reviews
router.get("/products/:id/reviews", authenticateToken, async (req, res) => {
  const product_id = Number(req.params.id);

  if (!isValidId(product_id)) {
    return res.status(400).json({ error: "ID must be a positive integer" });
  }

  const product = await getProduct(product_id);
  if (!product) {
    return res.status(404).json({ error: "Product not found" });
  }

  const reviews = await getReviewsByProduct(product_id);
  res.json(reviews);
});

export default router;
