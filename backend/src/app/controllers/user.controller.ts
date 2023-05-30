import {Context} from "koa";
import Router from "koa-router";
import jwt from "jsonwebtoken";
import bcrypt from 'bcrypt';
import { Op } from 'sequelize';

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
console.log("User controller connected to the Orders database.");

const router: Router = new Router({ prefix: '/petapi' });

// API routes for users

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
  
router.post("/user", async (ctx: Context) => {
  const user: UserAttributes = ctx.request.body as UserAttributes;

  const existingUser = await UserModel.findOne({ where: { email: user.email } });
  if (existingUser) {
    ctx.status = 400;
    ctx.body = { message: "This email is already in use" };
    return;
  }

  let id = user.id; // default to the ID provided in the request body
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




  router.put("/user/:id", async (ctx: Context) => {
    const { id } = ctx.params;
    const user: UserAttributes = ctx.request.body as UserAttributes;
  
    const existingUser: UserAttributes | null = await UserModel.findByPk(id);
  
    if (!existingUser) {
      ctx.status = 404; // Set HTTP status code to 404 (Not Found)
      ctx.body = "User not found"; // Set the response body to an error message
    } else {
      const result = await UserModel.update(user, { where: { id } });
      console.log(result);
      ctx.body = result;
    }
  });
  
  router.delete("/user/:id", async (ctx: Context) => {
    const { id } = ctx.params;
  
    const existingUser: UserAttributes | null = await UserModel.findByPk(id);
  
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

  router.post("/user/authenticate", async (ctx: Context) => {
    const { username, password } = ctx.request.body as { username:string, password:string };
    console.log(username);
    console.log(password);
    
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
  
  /*
  router.post("/user/authenticate", async (ctx: Context) => {
    const { username, email, password, id } = ctx.request.body as {
      username: string;
      email: string;
      password: string;
      id?: number;
    };
  
    // Check if user with same name or email already exists
    const existingUser = await UserModel.findOne({
      where: {
        [Op.or]: [{ name: username }, { email: email }],
        id: { [Op.ne]: id }, // exclude current user when updating
      },
    });
  
    if (existingUser) {
      if (existingUser.name === username) {
        ctx.throw(400, "Username is already in use.");
      } else {
        ctx.throw(400, "Email is already in use.");
      }
    }
  
    let user: any;
  
    // If an ID is given, find the user with that ID
    if (id !== undefined) {
      user = await UserModel.findOne({
        raw: true,
        where: { id },
      });
    } else {
      // If no ID is given, find the user with the lowest available ID
      user = await UserModel.findOne({
        order: [['id', 'ASC']],
        raw: true,
      });
    }
  
    // If no user was found, set status to unauthorized and return
    if (!user) {
      ctx.code = 401;
      ctx.body = "Unauthorized";
      return;
    }
  
    const res = await bcrypt.compare(password, user.password);
  
    if (res) {
      ctx.body = {
        token: jwt.sign({ name: user.name, role: user.role }, process.env.SECRET),
        status: "authorized",
      };
      ctx.code = 200;
    } else {
      ctx.code = 401;
      ctx.body = "Unauthorized";
    }
  });
*/
  export default router;