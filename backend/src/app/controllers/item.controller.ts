import { Context} from "koa";
import Router from "koa-router";
import {ItemModel, ItemAttributes} from "../models/item.model";
import { Op } from "sequelize";
import { validate } from "../middleware/joi-wrapper";
import Joi from "joi";

const router: Router = new Router({ prefix: '/petapi' });

ItemModel.sync();
console.log("Item controller connected to the Orders database.");

// API routes for items
router.get("/items/search", validate({
  query:{
    text: Joi.string().required()
  }
}), async (ctx: Context) => {
  let items: ItemAttributes[] = [];
  console.log(ctx.query.categories);
  if (ctx.query.text) {
  // Handle requests with the name query parameter
  let text = ctx.query.text as string;
  items = await ItemModel.findAll({
  where: {
  name: {
  [Op.like]: `%${text}%`
  }
  }
  });
  } 
  ctx.body = items;
  ctx.status = 200;
 });

//if the categoryparemeter is all it will call all items, if not it will use search for 
//the items with the given category names.
router.get("/items", validate({
  query:{
    categories: Joi.string().required()
  }
}), async (ctx: Context) => {
  let items: ItemAttributes[] = [];
  console.log("we are here"); 
  console.log(ctx.query.categories);
  if (ctx.query.categories === "all") {
  items = await ItemModel.findAll();
  }
  else {
  let categories = (ctx.query.categories as string).split(',');
  let orOperator = [];
  for (let index=1 ;index< categories.length;index++) {
  orOperator.push({ [Op.like] : `%${categories[index]}%`})
  }
  console.log(orOperator);
  items = await ItemModel.findAll({
  where: {
  categories: {
  [Op.and]: [
  { [Op.like]: `%${categories[0]}%` },
  {
  [Op.or]: orOperator
  }
  ]
  }
  } 
  });
  }
  ctx.body = items;
  ctx.status = 200;
 });
 
 router.post("/items", async (ctx: Context) => {
  const itemData: ItemAttributes = ctx.request.body as ItemAttributes;

  let id;
  const lastItem = await ItemModel.findOne({ order: [['id', 'DESC']] });

  if (lastItem === null) {
    id = 1;
  } else {
    id = lastItem.id + 1;
  }

  // Check if the id exists, if yes look for any gaps in the sequence of ids
  if (itemData.hasOwnProperty("id")) {
    // Check if this id already exists
    const existingItem = await ItemModel.findOne({ where: { id: itemData.id } });
    if (existingItem) {
      ctx.status = 400; // Bad Request
      ctx.body = { message: "This ID is already in use" };
      return;
    }
    
    id = itemData.id;
  } else {
    // Find any unused ids 
    const result = await ItemModel.findAll();
    const allIds = result.map((item: any) => item.id);
    const maxId = Math.max(...allIds);
    
    for (let i = 1; i <= maxId; i++) {
      if (!allIds.includes(i)) {
        id = i
        break;
      }
    }
  }
  
  try {
    const result = await ItemModel.create({...itemData, id});
    ctx.status = 201; // Created
    ctx.body = { message: "Item created successfully", data: result };
  } catch (error) {
    throw error;
  }
});

//routing to change an already created item
router.put("/items/:id", async (ctx: Context) => {
  const  id  = ctx.params.id;
  const item: ItemAttributes = ctx.request.body as ItemAttributes;
  const result /*: [number, ItemAttributes[]]*/ = await ItemModel.update(item, {
    where: { id },
  });
   ctx.body = result;
});

//routing to delete an item
router.delete("/items/:id", async (ctx: Context) => {
  const { id } = ctx.params;
  const result: number = await ItemModel.destroy({
    where: { id },
  });
  if (result === 0) {
    // If no rows were deleted, return a 404 error.
    ctx.body = "Item not found";
    ctx.status = 404;
  } else {
    // If rows were deleted, return a success message.
    ctx.body = `Item ${id} has been deleted successfully`;
    ctx.status = 200;
  }
});

router.get("/items/:id", async (ctx: Context) => {
  const { id } = ctx.params;
  const item: ItemAttributes | null = await ItemModel.findByPk(id);
  
  if (!item) {
    ctx.body = "Item not found";
    ctx.status = 404;
  } else {
    ctx.body = item;
    ctx.status = 200;
  }
});

router.get("/items/by-name/:name", async (ctx: Context) => {
  const { name } = ctx.params;
  const items: ItemAttributes[] = await ItemModel.findAll({
    where: {
      name: {
        [Op.like]: `%${name}%`,
      },
    },
  });

  if (!items.length) {
    ctx.body = "Item not found";
    ctx.status = 404;
  } else {
    ctx.body = items;
    ctx.status = 200;
  }
});

export default router;