// Import the Koa framework and the Koa body parser middleware
import Koa from "koa";
import bodyParser from "koa-bodyparser";

// Import the user and item controllers
import userController from "./controllers/user.controller";
import itemController from "./controllers/item.controller";

// Create a new Koa application instance
const app: Koa = new Koa();

// Add the Koa body parser middleware to the application
app.use(bodyParser());

// Register the user and item controllers with the application, making their routes available
app.use(userController.routes());
app.use(itemController.routes());

// Export the created Koa application instance for use in other parts of the application
export default app;
