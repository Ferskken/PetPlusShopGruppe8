import { Context } from "koa";
import Router from "koa-router";

import { OrderModel, OrderAttributes } from "../models/order.model";

const router: Router = new Router({ prefix: "/petapi" });

OrderModel.sync();
console.log("Order controller connected to the Orders database.");


// API routes for orders

// Get all orders
router.get("/orders", async (ctx: Context) => {
  console.log("Fetching orders...");
  const orders: OrderAttributes[] = await OrderModel.findAll();
  console.log("Orders fetched:", orders);
  
  if (orders.length === 0) {
    ctx.status = 404;
    ctx.body = { error: "No orders found" };
  } else {
    ctx.status = 200;
    ctx.body = orders;
  }
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
  ctx.status = 200;
  ctx.body = updatedOrder;
});


router.delete("/orders/:id", async (ctx: Context) => {
  const orderId = ctx.params.id;

  // Look up the order by ID
  const order: OrderAttributes | null = await OrderModel.findByPk(orderId);

  if (!order) { // Order not found
    ctx.status = 404;
    ctx.body = { error: "Order not found" };
  } else { // Order found - proceed with deletion
    await OrderModel.destroy({ where: { id: orderId } }); // Delete the order from the database
    ctx.status = 204; // success but no content to return
    ctx.body = { message: `Order ${orderId} successfully deleted` };
  }
});

// Get orders by last name, phone number, zip code, or ID
router.get("/orders/search", async (ctx: Context) => {
  console.log("Searching orders...");
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