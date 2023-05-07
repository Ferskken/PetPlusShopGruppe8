import { Context } from "koa";
import Router from "koa-router";
import { Op } from "sequelize";

import { OrderModel, OrderAttributes } from "../models/order.model";

const router: Router = new Router({ prefix: "/petapi" });

OrderModel.sync();

// API routes for orders

// Get all orders
router.get("/orders", async (ctx: Context) => {
  const orders: OrderAttributes[] = await OrderModel.findAll();
  ctx.body = orders;
  ctx.status = 200;
});

// Create an order
router.post("/orders", async (ctx: Context) => {
  const order: OrderAttributes = ctx.request.body as OrderAttributes;
  const result: OrderAttributes = await OrderModel.create(order);
  ctx.body = result;
});

// routing to change an already created order
router.put("/orders/:id", async (ctx: Context) => {
    const id = ctx.params.id;
    const order: OrderAttributes = ctx.request.body as OrderAttributes;
    const [affectedCount, affectedRows] = await OrderModel.update(order, {
      where: { id },
      returning: true,
    });
    ctx.body = affectedRows;
  });

// Delete an order
router.delete("/orders/:id", async (ctx: Context) => {
  const { id } = ctx.params;
  const result: number = await OrderModel.destroy({
    where: { id },
  });
  ctx.body = result;
});

// Get orders by zip code
router.get("/orders/by-zipcode/:zipCode", async (ctx: Context) => {
  const { zipCode } = ctx.params;
  const orders: OrderAttributes[] = await OrderModel.findAll({
    where: { zipCode },
  });
  ctx.body = orders;
  ctx.status = 200;
});

export default router;