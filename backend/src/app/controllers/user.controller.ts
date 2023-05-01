import { Context} from "koa";
import Router from "koa-router";
import jwt from "jsonwebtoken";
import bcrypt from 'bcrypt';

import { UserModel, UserAttributes} from "../models/user.model";

UserModel.sync();

const router: Router = new Router({ prefix: '/petapi' });

// API routes for users

router.get("/user/all", async (ctx: Context) => {
    const users: UserAttributes[] = await UserModel.findAll();
    ctx.body = users;
  });

router.get("/user/:id", async (ctx: Context) => {
    console.log(ctx.params);
    const { id } = ctx.params;
    const user: UserAttributes = ctx.request.body as UserAttributes;
    const result = await UserModel.findAll({
      where: { id },
    });
    ctx.body = result;
  });
  
  router.post("/user", async (ctx: Context) => {
    const user: UserAttributes = ctx.request.body as UserAttributes;
    
    user.password = await bcrypt.hash(user.password, 10);
    const result: UserAttributes = await UserModel.create(user);
    ctx.body = result;
    console.log("added user");
  });
  
  router.put("/user/:id", async (ctx: Context) => {
    const { id } = ctx.params;
    const user: UserAttributes = ctx.request.body as UserAttributes;
    const result = await UserModel.update(user, {
      where: { id },
      
    });
    console.log(result);
    ctx.body = result;
    
  });
  
  router.delete("/user/:id", async (ctx: Context) => {
    const { id } = ctx.params;
    const result: number = await UserModel.destroy({
      where: { id },
    });
    ctx.body = result;
  });
  
  router.post("/authenticate", async (ctx: Context) => {
    const { email, password } = ctx.request.body as { email:string, password:string };
    const result = await UserModel.findOne({
      raw: true,
      where: { email:email }, 
    });
    console.log(result.password);
    console.log(password);
    const res = await bcrypt.compare(password, result.password);
    if(res){
      ctx.body = {
        token:jwt.sign({ email:result.email, role:'user' }, 'your_secret_key'),
        status:'authorized'
      }
      ctx.code = 200;
    }
    else{
      ctx.code = 401;
      ctx.body = "Unauthorized";
    }
    
  });
  export default router;