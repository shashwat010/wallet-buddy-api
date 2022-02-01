/**
 * Use this module file to create instances of all controllers and simplify imports in to your routers
 */

import { AdminController } from './admin.controller';
import { UserController } from './user.controller';
import { OrderController } from './order.controller';

export const adminController = new AdminController();
export const userController = new UserController();
export const orderController = new OrderController();