import db from "../client.js";

export async function createReview({ rating, comment, product_id }) {
    const sql = `
        INSERT INTO reviews (rating, comment, product_id)
        VALUES ($1, $2, $3)
        RETURNING *;`;
    const { rows: review } = await db.query(sql, [
        rating,
        comment,
        product_id
    ]);
    return review[0];
}

export async function getReviewsByProduct(product_id) {
	const sql = `
        SELECT * FROM reviews WHERE product_id = $1;`;
	const { rows: review } = await db.query(sql);
	return review[0];
}