import express from 'express';
import authMiddleWare from '../middleware/auth.js';
import { listOrders, placeOrder, removeOrders, updateStatus, userOrders, verifyOrder } from '../controllers/orderController.js';

const orderRouter = express.Router();

orderRouter.post('/place',authMiddleWare,placeOrder);
orderRouter.post('/remove',authMiddleWare,removeOrders);
orderRouter.post('/verify',authMiddleWare,verifyOrder);
orderRouter.post('/userorders',authMiddleWare,userOrders);
orderRouter.get('/list',listOrders);
orderRouter.post('/status',updateStatus);

export default orderRouter;