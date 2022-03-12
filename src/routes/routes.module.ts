import { baseRouter } from "./base.router";
import { routerAdmin } from "./admin.router";
import { routerTransaction } from "./transaction.router";

//* Add your express router objects here
export const allRoutes = [baseRouter,routerAdmin,routerTransaction];
