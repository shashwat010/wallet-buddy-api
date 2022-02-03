import { baseRouter } from "./base.router";
import { routerAdmin } from "./admin.router";
import { userRouter } from "./user.router";
import { orderRouter } from "./order.router";

//* Add your express router objects here
export const allRoutes = [baseRouter,routerAdmin,userRouter,orderRouter];
