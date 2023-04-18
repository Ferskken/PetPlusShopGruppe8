import { Context} from "koa";
import Router from "koa-router";

import { UserModel, UserAttributes} from "../models/user.model";

UserModel.sync();

const router: Router = new Router({ prefix: '/petapi' });

// API routes for users

router.get("/users", async (ctx: Context) => {
    const users: UserAttributes[] = await UserModel.findAll();
    ctx.body = users;
  });
  
  router.post("/users", async (ctx: Context) => {
    const user: UserAttributes = ctx.request.body as UserAttributes;
    const result: UserAttributes = await UserModel.create(user);
    ctx.body = result;
  });
  
  router.put("/users/:id", async (ctx: Context) => {
    const { id } = ctx.params;
    const user: UserAttributes = ctx.request.body as UserAttributes;
    const result = await UserModel.update(user, {
      where: { id },
    });
    // ctx.body = result[1][0];
    ctx.body = result;
  });
  
  router.delete("/users/:id", async (ctx: Context) => {
    const { id } = ctx.params;
    const result: number = await UserModel.destroy({
      where: { id },
    });
    ctx.body = result;
  });

  export default router;