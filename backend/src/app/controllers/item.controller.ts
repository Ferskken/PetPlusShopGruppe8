import { Context} from "koa";
import Router from "koa-router";



import {ItemModel, ItemAttributes} from "../models/item.model";
import { Op } from "sequelize";

const router: Router = new Router({ prefix: '/petapi' });

ItemModel.sync();

// API routes for items
router.get("/items", async (ctx: Context) => {
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







/*
router.get("/items", async (ctx: Context) => {
  console.log("we are here");  
  console.log(ctx.query.categories);
  let categories = (ctx.query.categories as string).split(',');
  let andOperator = [];
  for (let index in categories) {
    andOperator.push({ categories: { [Op.like] : `%${categories[index]}%`} })
  }
  console.log(andOperator);
  const items: ItemAttributes[] = await ItemModel.findAll(
    {
      where: {
        [Op.and]: andOperator
      }
    });
 // console.log(items);
  ctx.body = items;
  ctx.status = 200;
});
*/




router.post("/items", async (ctx: Context) => {
  const item: ItemAttributes = ctx.request.body as ItemAttributes;
  const result: ItemAttributes = await ItemModel.create(item);
  ctx.body = result;
});

router.put("/items/:id", async (ctx: Context) => {
  const  id  = ctx.params.id;
  const item: ItemAttributes = ctx.request.body as ItemAttributes;
  const result /*: [number, ItemAttributes[]]*/ = await ItemModel.update(item, {
    where: { id },
  });
 // ctx.body = result[1][0];
   ctx.body = result;
});

router.delete("/items/:id", async (ctx: Context) => {
  const { id } = ctx.params;
  const result: number = await ItemModel.destroy({
    where: { id },
  });
  ctx.body = result;
});

export default router;