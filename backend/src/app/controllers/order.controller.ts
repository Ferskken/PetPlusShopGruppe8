import { Context } from "koa";
import Router from "koa-router";

import { OrderModel, OrderAttributes } from "../models/order.model";

const router: Router = new Router({ prefix: "/petapi" });

OrderModel.sync();

// API routes for orders

// Get all orders
router.get("/orders", async (ctx: Context) => {
    console.log("Fetching orders...");
    const orders: OrderAttributes[] = await OrderModel.findAll();
    console.log("Orders fetched:", orders);
    ctx.body = orders;
    ctx.status = 200;
  });

// Create an order
router.post("/orders", async (ctx: Context) => {
    console.log("Creating order...");
    const order: OrderAttributes = ctx.request.body as OrderAttributes;
    const result: OrderAttributes = await OrderModel.create(order);
    console.log("Order created:", result);
    ctx.body = result;
  });

// Routing to change an already created order
router.put("/orders/:id", async (ctx: Context) => {
   console.log("Updating order...");
  const id = ctx.params.id;
  const order: OrderAttributes = ctx.request.body as OrderAttributes;
  const affectedCount: number[] = await OrderModel.update(order, {
    where: { id },
  });
  const updatedOrder: OrderAttributes | null = await OrderModel.findByPk(id);
  console.log("Order updated:", updatedOrder);
  ctx.body = updatedOrder;
});


// Delete an order
router.delete("/orders/:id", async (ctx: Context) => {
  console.log("Deleting order...");
  const { id } = ctx.params;
  const result: number = await OrderModel.destroy({
    where: { id },
  });
  ctx.body = result;
});

// Get orders by last name, phone number, zip code, or ID
router.get("/orders", async (ctx: Context) => {
    console.log("Fetching orders...");
    const { lastName, phone, zipCode, id } = ctx.query;
  
    let whereClause = {};
    if (lastName) {
      whereClause = { ...whereClause, lastName };
      console.log("Listing orders for Last name:", lastName);
    }
    if (phone) {
      whereClause = { ...whereClause, phone };
      console.log("Listing orders for phone number:", phone);
    }
    if (zipCode) {
      whereClause = { ...whereClause, zipCode };
      console.log("Listing orders for zip:", zipCode);
    }
    if (id) {
      whereClause = { ...whereClause, id };
      console.log("Listing orders for id:", id);
    }
  
    const orders: OrderAttributes[] = await OrderModel.findAll({
      where: whereClause,
    });
    console.log("Orders fetched:", orders);
    ctx.body = orders;
    ctx.status = 200;
  });

export default router;

