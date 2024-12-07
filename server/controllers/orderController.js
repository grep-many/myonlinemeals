import { frontend_url, stripeSecret } from "../config/load.js";
import orderModel from "../models/orderModel.js";
import userModel from '../models/userModel.js';
import Stripe from 'stripe';

const stripe = new Stripe(stripeSecret);

// placing user order from frontend
const placeOrder = async (req, res) => {
    try {

        const newOrder = new orderModel({
            userId: req.body.userId,
            items: req.body.items,
            amount: req.body.amount,
            address: req.body.address,
        });

        await newOrder.save();

        await userModel.findByIdAndUpdate(req.body.userId, {
            cartData: {}
        });

        const line_items = req.body.items.map((item) => ({
            price_data: {
                currency: 'usd',
                product_data: {
                    name: item.name
                },
                unit_amount: item.price * 100
            },
            quantity: item.quantity
        }))

        line_items.push({
            price_data: {
                currency: 'usd',
                product_data: {
                    name: 'Delivery Charges'
                },
                unit_amount: 2 * 100
            },
            quantity: 1
        });

        const session = await stripe.checkout.sessions.create({
            line_items: line_items,
            mode: 'payment',
            success_url: `${frontend_url}/verify?success=true&orderId=${newOrder._id}`,
            cancel_url: `${frontend_url}/verify?success=false&orderId=${newOrder._id}`,
        })

        res.json({
            success: true,
            session_url: session.url,
        })

    } catch (err) {
        console.log(err);
        res.json({
            success: false,
            message: 'Something went wrong'
        })
    }
}

// Verifying order
const verifyOrder = async (req, res) => {
    const { orderId, success } = req.body;
    try {
        console.log("Received Order ID:", orderId);  // Debugging line
        console.log("Payment Success:", success);    // Debugging line

        if (success === 'true') {  // success is string 'true'
            // Update payment status to true
            await orderModel.findByIdAndUpdate(orderId, { payment: true });
            res.json({ success: true, message: "Paid" });
        } else {
            const order = await orderModel.findById(orderId);
            if (order) {
                // Delete the order if not paid
                await orderModel.findByIdAndDelete(orderId);
                res.json({ success: false, message: "Not Paid, Order Deleted" });
            } else {
                res.json({ success: false, message: "Order not found" });
            }
        }
    } catch (error) {
        console.log("Error in verifyOrder:", error); // Debugging line
        res.json({ success: false, message: "Something went wrong" });
    }
};

// user order for frontend
const userOrders = async (req, res) => {
    try {
        const orders = await orderModel.find({
            userId: req.body.userId
        });

        res.json({
            success: true,
            data: orders,
            message: 'fetched users orders'
        })

    } catch (err) {
        console.log(err);
        res.json({
            success: false,
            message: 'Something went wrong'
        })
    }
}

// listing order for admin panel
const listOrders = async (req, res) => {
    try {
        const orders = await orderModel.find({});
        res.json({
            success: true,
            data: orders
        })
    } catch (error) {
        console.log(error);

        res.json({
            success: false,
            message: 'Something went wrong while listing orders'
        })
    }
}

// api for updating order Status
const updateStatus = async (req, res) => {

    try {

        await orderModel.findByIdAndUpdate(req.body.orderId, {
            status: req.body.status
        });
        res.json({
            success: true,
            message: 'order status updated successfully!'
        })

    } catch (error) {
        console.log(error);

        res.json({
            success: false,
            message: 'Something went wrong while listing orders'
        })
    }
}

// remove orders api
const removeOrders = async (req, res) => {

    const {orderId} = req.body

    try {
        await orderModel.findByIdAndDelete(orderId);
        res.json({
            success:true,
            message:'order removed successfully'
        })

    } catch (error) {
        console.log(error);
        res.json({
            success: false,
            message: 'Something went wrong while listing orders'
        })
    }
}

export {
    placeOrder,
    verifyOrder,
    userOrders,
    listOrders,
    updateStatus,
    removeOrders,
}