import express from "express";
import { verifyToken } from "../app.js";
import { createOrder, getOrders,getOrdersId, getOrdersUser } from "../db/queries/orders.js";

const router = express.Router();

router.post("/", verifyToken, async (req, res, next) => {
  const { id, date, note, user_id } = req.body;
  if (date == null) {
    return res.status(400).send({ error: "Missing Date" });
  }

  const newOrder = await createOrder({
    date,
    note,
    user_id: id,
  });

  res.status(201).send(newOrder);
});

router.get("/", verifyToken, async (req, res, next) => {
  const getOrder = await getOrders({ id, date, note, user_id });
  res.send(getOrder);
});

router.get("/:id", verifyToken, async (req, res, next) => {
  const id = Number(req.params.id);
  const orderid = await getOrdersId(id);

  if (!orderid) {
    return res.status(404).send({ error: "order doesnt exist" });
  }

  if (req.user.id !== id) {
    return res.status(403).send({ error: "not users order" });
  }
  res.send(orderid);
});

router.get("/:user_id", verifyToken, async (req, res, next) => {
  const userid = Number(req.params.id);
  const getOrder = await getOrdersUser(userid);
  res.send(getOrder);
});

export default router;
