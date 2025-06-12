import db from "../client.js";
import bcrypt from 'bcrypt'

export async function createUser({ username, password }) {
	const sql = `
        INSERT INTO users (username, password)
        VALUES ($1, $2)
        RETURNING *;`;
    const newPassword = await bcrypt.hash(password, 5)
	const { rows: user } = await db.query(sql, [
		username,
		newPassword
	]);
	return user[0];
}