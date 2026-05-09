import Order from '../models/order.model.js';
import HandleError from "../utils/handleError.js";
import handleAsyncError from "../middleware/handleAsyncError.js";

export const createOrder = handleAsyncError(async (req, res) => {
  const { paymentInfo, leadPrice } = req.body;

  const order = await Order.create({
    user: req.user._id,
    paymentInfo,
    leadPrice,
    paidAt: Date.now()
  })

  res.status(201).json({
    success: true,
    order
  })
});