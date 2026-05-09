import express from  "express";
import { createOrder } from "../controller/order.controller.js";
import { authenticateUser } from "../middleware/auth.user.js";

const router = express.Router();

router.route('/new/order').post(authenticateUser, createOrder)

export default router;