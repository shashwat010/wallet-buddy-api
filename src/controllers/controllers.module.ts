/**
 * Use this module file to create instances of all controllers and simplify imports in to your routers
 */

import { AdminController } from './admin.controller';
import { IModel } from '../interfaces/IModel';
import { TransactionController } from './transaction.controller';

export const adminController = new AdminController();
export const transactionController = new TransactionController();
