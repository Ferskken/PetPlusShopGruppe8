import { Context} from "koa";
import Router from "koa-router";
import jwt from "jsonwebtoken";
import bcrypt from 'bcrypt';

import { UserModel, UserAttributes, Role} from "../models/user.model";
import { validate } from "../middleware/joi-wrapper";
import Joi from "joi";

UserModel.sync().then(async(res)=>{
 /* console.log("Creating Admin user");
  await UserModel.create(
    {
    id: 0,
    name: "Administrator",
    email: "admin@petshop.com",
    password:  await bcrypt.hash("admin123", 10),
    role: Role.Admin
  }); 
  console.log("Creating Guest user");
  await UserModel.create(
    {
    id: 1,
    name: "Guest",
    email: "guest@petshop.com",
    password: await bcrypt.hash("", 10),
    role: Role.Guest
  });
*/
});

const router: Router = new Router({ prefix: '/petapi' });

// API routes for users

router.get("/user/all", validate({
  user:{
    role: Joi.string().valid('Admin').required()
  }
}) , async (ctx: Context) => {
  console.log(ctx.state)  
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
    user.role = Role.User;
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
  
  router.post("/user/authenticate", async (ctx: Context) => {
    const { username, password } = ctx.request.body as { username:string, password:string };
    const user = await UserModel.findOne({
      raw: true,
      where: { email:username }, 
    });
    console.log(user.password);
    console.log(password);
    const res = await bcrypt.compare(password, user.password);
    if(res){
      ctx.body = {
        token:jwt.sign({ name:user.name, role:user.role }, 'your_secret_key'),
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