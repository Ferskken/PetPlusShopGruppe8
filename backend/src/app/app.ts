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

/**
 * Registers the JWT authentication middleware with the specified secret key and exclusion paths.
 * This middleware verifies and handles JSON Web Tokens (JWT) for authentication.
 *
 * @param {string} secret - The secret key used for JWT verification.
 * @param {string[]} excludedPaths - An array or regex patterns of paths that should be excluded from JWT authentication.
 * @returns {void}
 */
//app.use(jwt({ secret: process.env.SECRET }).unless({ path: [/^\/petapi\/user\/authenticate/]}));

// Register the user and item controllers with the application, making their routes available
app.use(userController.routes());
app.use(itemController.routes());

// Export the created Koa application instance for use in other parts of the application
export default app;
