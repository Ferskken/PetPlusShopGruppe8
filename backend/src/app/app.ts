// Import the Koa framework and the Koa body parser middleware
import Koa from "koa";
import bodyParser from "koa-bodyparser";
import jwt from "koa-jwt";
// Import the user and item controllers
import userController from "./controllers/user.controller";
import itemController from "./controllers/item.controller";

// Create a new Koa application instance
const app: Koa = new Koa();

// Add the Koa body parser middleware to the application
app.use(bodyParser());
// Middleware below this line is only reached if JWT token is valid
// unless the URL starts with '/public'

// app.use(jwt({ secret: 'your_secret_key' }).unless({ path: [/^\/petapi\/authenticate/,/^\/petapi\/items/] }));

// Register the user and item controllers with the application, making their routes available
app.use(userController.routes());
app.use(itemController.routes());

// Export the created Koa application instance for use in other parts of the application
export default app;
