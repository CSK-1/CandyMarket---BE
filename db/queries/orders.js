import db from "../client.js";

export async function createOrder({ date, note, user_id }) {
    const sql = `
        INSERT INTO orders (date, note, user_id)
        VALUES ($1, $2, $3)
        RETURNING *;`;
    const { rows: order } = await db.query(sql, [
        date,
        note,
        user_id
    ]);
    return order[0];
}

export async function getOrders() {
	const sql = `
        SELECT * FROM orders;`;
	const { rows: order } = await db.query(sql);
	return order;
}


export async function getOrdersId(id) 
	const sql = `
        SELECT * FROM orders WHERE id = $1;`;
	const { rows: order } = await db.query(sql, [id]);
	return order[0];
}

export async function getOrdersUser(user_id) {
	const sql = `
        SELECT * FROM orders WHERE user_id = $1;`;
	const { rows: order } = await db.query(sql, [user_id]);
	return order[0];
}