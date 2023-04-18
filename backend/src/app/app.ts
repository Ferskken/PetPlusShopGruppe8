import Koa from "koa";
import bodyParser from "koa-bodyparser";

import userController  from "./controllers/user.controller"
import itemController  from "./controllers/item.controller"


const app: Koa = new Koa();

app.use(bodyParser());

// Register the router
app.use(userController.routes());
app.use(itemController.routes());


export default app