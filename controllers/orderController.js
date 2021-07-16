import { Cart } from '../models/cart.js';
import { User } from '../models/user.js';
import { Order } from '../models/order.js';

export const createOrder = async function(request, response){
    let user = await User.findOne({ _id: request.user._id });
    let cart = await Cart.findOne({ _id: request.params.id });
    let order = await Order.findOne({number: request.body.number});
    if (!cart) {
        response.status(400).send(`Can't find cart with such id.`)
    }
    else if (order) {
        response.status(400).send(`Order with such number is aleady exist. Please change a number.`)
    }
    else {
        const newOrder = new Order({ number: request.body.number});
        newOrder.user =  request.user._id;
        newOrder.populate('user')
        await newOrder.save();

        newOrder.products = cart.products;
        newOrder.populate('product')
        await newOrder.save();

        user.orders.push(newOrder._id);
        user.populate('order');
        await user.save();
        // await Cart.deleteOne({_id: request.params.id });

        response.send(`New order with number ${newOrder.number} was successfully created.
         Order of user ${user.name}. 
         With products ${newOrder.products}`);
    }
}

export const deleteOrder = async function(request, response){
    try {
        let order = await Order.findOne({ _id: request.params.id });
        let user = await User.findOne({ _id: request.user._id });
        if (!order) {
            response.send(`Can't find this order.`);
        }
        else if(user.role == "user" && order.user._id.toString() !== user._id.toString()){
           response.send(`It's not your order and you don't have access to delete this order.`)
        }
        else {
            Order.deleteOne({ _id: request.params.id }, function (err, result) {
                if (err) return console.log(err);
            });
            for(let i = 0; i < user.orders.length; i++){
                if(user.orders[i]._id.toString() == order._id.toString()){
                    user.orders.splice(user.orders.indexOf(i), 1);
                    await user.save();
                }
            }
            response.send(`Delete order ${order.number}`);
        }
    }
    catch (err) {
        response.status(400).send(`Something wents wrong. Can't find this order.`)
    }
}

export const getAllOrders = async function(request, response){
    try {
        let orders = await Order.find();
        let user = await User.findOne({ _id: request.user._id });

        if (user.role == "admin" && orders) {
            response.send(`Orders ${orders}`);
        }
        else if(user.role == "user"){
           response.send(`Your orders: ${user.orders}`)
        }
        else {
            response.send(`User ${user.name} hasn't orders`)
        }
    }
    catch (err) {
        response.status(400).send(`Something wents wrong. Can't find this order.`)
    }
}

export const getOrderById = async function(request, response){
    try {
        let order = await Order.findOne({ _id: request.params.id });
        if (order) {
            response.send(`Order number: ${order.number} of user ${order.user.name}`)
        }
        else {
            response.send(`Can't find such order`)
        }
    }
    catch (err) {
        response.status(400).send(`Something wents wrong. Can't find the order by id.`)
    }
}