import {Context} from "koa";
import Router from "koa-router";
import jwt from "jsonwebtoken";
import bcrypt from 'bcrypt';
import { Op } from 'sequelize';

import { UserModel, UserAttributes, Role} from "../models/user.model";
import { validate } from "../middleware/joi-wrapper";
import Joi from "joi";

UserModel.sync().then(async(res)=>{
  
 console.log("Creating Admin user");
 /*
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

/** Get all items */
router.get("/user/all", validate({
  user:{
    role: Joi.string().valid('Admin').required(),
    name: Joi.string()
  }
}) , async (ctx: Context) => {
  const users: UserAttributes[] = await UserModel.findAll();
  
  if (users.length === 0) {  // check if no users were found
    ctx.status = 404;  // set the HTTP status code to 404 (Not Found)
    ctx.body = "No users found";  // respond with an error message
  } else {
    ctx.body = users;
  }
});

/** Get user by id */
router.get("/user/:id", validate({
  user:{
    role: Joi.string().valid('Admin').required(),
    name: Joi.string()
  }
}) , async (ctx: Context) => {
  const { id } = ctx.params;
  
  const user: UserAttributes | null = await UserModel.findByPk(id);
  
  if (!user) {  // check if no user was found
    ctx.status = 404;  // set the HTTP status code to 404 (Not Found)
    ctx.body = "User not found";  // respond with an error message
  } else {
    ctx.body = user;
  }
});

/** Get user ny username */
router.get("/user/by-name/:name", async (ctx: Context) => {
  const { name } = ctx.params;
  const users: UserAttributes[] = await UserModel.findAll({
    where: {
      name: {
        [Op.like]: `%${name}%`,
      },
    },
  });

  if (!users.length) {
    ctx.body = "User not found";
    ctx.status = 404;
  } else {
    ctx.body = users;
    ctx.status = 200;
  }
});

/** Creates a new user */
router.post("/user", async (ctx: Context) => {
  const user: UserAttributes = ctx.request.body as UserAttributes;

  const existingUser = await UserModel.findOne({ where: { email: user.email } });
  //Checks if the email is already in use
  if (existingUser) {
    ctx.status = 400;
    ctx.body = { message: "This email is already in use" };
    return;
  }
  // default to the ID provided in the request body
  let id = user.id; 
  if (!id) {
    const allUsers = await UserModel.findAll({
      order: [['id', 'ASC']]
    });

    if (allUsers.length === 0) {
      // If there are no users, start with ID 1
      id = 1;
    } else if (allUsers[0].id > 1) {
      // If the minimum ID in use is greater than 1, use ID 1
      id = 1;
    } else {
      // Find the first gap between IDs and use that as the new ID
      for (let i = 0; i < allUsers.length - 1; i++) {
        if (allUsers[i + 1].id - allUsers[i].id > 1) {
          id = allUsers[i].id + 1;
          break;
        }
      }
      if (!id) {
        id = allUsers[allUsers.length - 1].id + 1;
      }
    }
  } else {
    //Checks if the id is already in use
    const existingUser = await UserModel.findOne({ where: { id } });
    if (existingUser) {
      ctx.status = 400;
      ctx.body = { message: "This ID is already in use" };
      return;
    }
  }

  user.id = id;
  user.password = await bcrypt.hash(user.password, 10);
  user.role = Role.User;

  const result: UserAttributes = await UserModel.create(user);

  ctx.body = { message: "User created", user: result };
});

  /** Change a user by id */
  router.put("/user/:id", async (ctx: Context) => {
    const { id } = ctx.params;
    const user: UserAttributes = ctx.request.body as UserAttributes;
  
    const existingUser: UserAttributes | null = await UserModel.findByPk(id);
  
    if (!existingUser) {
      ctx.status = 404; // Set HTTP status code to 404 (Not Found)
      ctx.body = "User not found"; // Set the response body to an error message
    } else {
      const result = await UserModel.update(user, { where: { id } });
      ctx.body = result;
    }
  });
  
  /** Delete a user by id */
  router.delete("/user/:id", async (ctx: Context) => {
    const { id } = ctx.params;
  
    const existingUser: UserAttributes | null = await UserModel.findByPk(id);
  
    //Checks if user exists
    if (!existingUser) {
      ctx.status = 404;
      ctx.body = "User not found";
    } else {
      const deletedUserName = existingUser.name; // Get the name of the deleted user
      const result: number = await UserModel.destroy({
        where: { id },
      });
      ctx.body = `User ${deletedUserName} successfully deleted`;
    }
  });

   /** Logs in user. USes json web token to decrypt password with bcrypt. */
  router.post("/user/authenticate", async (ctx: Context) => {
    const { username, password } = ctx.request.body as { username:string, password:string };

    const user = await UserModel.findOne({
      raw: true,
      where: { email:username }, 
    });
    console.log(user);
    console.log(user.password);
    console.log(password);
    const res = await bcrypt.compare(password, user.password);
    if(res){
      ctx.body = {
        token:jwt.sign({ name:user.name, role:user.role }, process.env.SECRET),
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