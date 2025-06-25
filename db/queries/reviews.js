import db from "../client.js";

export async function createReview({ rating, comment, product_id, user_id }) {
  const sql = `
    INSERT INTO reviews (rating, comment, product_id, user_id)
    VALUES ($1, $2, $3, $4)
    RETURNING *;`;
  const { rows: review } = await db.query(sql, [
    rating,
    comment,
    product_id,
    user_id
  ]);
  return review[0];
}

export async function getReviewsByProduct(product_id) {
  const sql = `
    SELECT r.id, r.rating, r.comment, r.created_at, u.username
    FROM reviews r
    JOIN users u ON r.user_id = u.id
    WHERE r.product_id = $1
    ORDER BY r.created_at DESC;
  `;
  const { rows: reviews } = await db.query(sql, [product_id]);
  return reviews;
}