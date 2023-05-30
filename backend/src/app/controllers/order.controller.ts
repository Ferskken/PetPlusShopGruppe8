import { Context } from "koa";
import Router from "koa-router";

import { OrderModel, OrderAttributes } from "../models/order.model";

const router: Router = new Router({ prefix: "/petapi" });

OrderModel.sync();

// API routes for orders

/** Get all orders */
router.get("/orders", async (ctx: Context) => {
  const orders: OrderAttributes[] = await OrderModel.findAll();
  
  if (orders.length === 0) {
    ctx.status = 404;
    ctx.body = { error: "No orders found" };
  } else {
    ctx.status = 200;
    ctx.body = orders;
  }
});

/** Create an order */
router.post("/orders", async (ctx: Context) => {
  
  const order: OrderAttributes = ctx.request.body as OrderAttributes;
  
  try {
    
  // Find the lowest available id if no id is given
  if (!order.id) {
    const orders: OrderAttributes[] = await OrderModel.findAll({
      attributes: ['id'],
      order: [['id', 'ASC']]
    });
    
    let lowestAvailableId: number = 1;
    for (let i = 0; i < orders.length; i++) {
      const currentId: number = orders[i].id;
      if (currentId !== lowestAvailableId) break;
      lowestAvailableId++;
    }

    order.id = lowestAvailableId;
  }
  
  const result: OrderAttributes = await OrderModel.create(order);
    
  ctx.body = result;
  } catch (error) {
    ctx.throw(500, "Failed to create order");
  }
});

/** Change an already created order */
router.put("/orders/:id", async (ctx: Context) => {

  /*
  const id = ctx.params.id;
  const order: OrderAttributes = ctx.request.body as OrderAttributes;

  const [affectedCount] = await OrderModel.update(order, {
    where: { id },
  });

  if (affectedCount > 0) {
    const updatedOrder: OrderAttributes | null = await OrderModel.findByPk(id);
    ctx.status = 200;
    ctx.body = updatedOrder ?? "Order found but could not be returned";
  } else {
    ctx.status = 404;
    ctx.body = "Order not found or not updated";
  }*/
});


/** Delete an order by id */
router.delete("/orders/:id", async (ctx: Context) => {
  const orderId = ctx.params.id;

  // Look up the order by ID ( Primary key)
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

/** Get orders by last name, phone number, zip code, or ID */
router.get("/orders/search", async (ctx: Context) => {
  const { lastName, phone, zipCode, id } = ctx.query;

  let whereClause = {};
  if (lastName) {
    whereClause = { ...whereClause, lastName };
  }
  if (phone) {
    whereClause = { ...whereClause, phone };
  }
  if (zipCode) {
    whereClause = { ...whereClause, zipCode };
  }
  if (id) {
    whereClause = { ...whereClause, id };
  }

  const orders: OrderAttributes[] = await OrderModel.findAll({
    where: whereClause,
  });
  ctx.body = orders;
  ctx.status = 200;
});
export default router;