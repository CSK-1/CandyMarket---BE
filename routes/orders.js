import express from "express";
import { verifyToken } from ".../app.js";
import { createOrder, getOrders } from "../queries/orders";

router.post("/orders", verifyToken, async (req, res, next) => {
    const {id, date, note, user_id} = req.body;
    if (date == null){
        return res.status(400).send({error : "Missing Date"})
    }

    const newOrder = await createOrder({
        date, note, user_id: id,
    });

    res.status(201).send(newOrder)
});

router.get("/orders", verifyToken, async (req, res, next) => {
    const getOrder = await getOrders({id, date, note, user_id})
    res.send(getOrder)
});

router.get("/orders:id", verifyToken, async (req, res, next) => {
    const id = Number(req.params.id)
    const orderid = await getOrders(id);

    if (!orderid){
        return res.status(404).send({error: "order doesnt exist"})
    }

    res.send(orderid)

    //test
});