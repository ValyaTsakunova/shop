import { Cart } from '../models/cart.js';
import { User } from '../models/user.js';

export const createCart = async function(request, response){
    let cart = await Cart.findOne({ name: request.body.name});
    if (cart) {
        response.status(400).send(`Such cart is already existed`)
    }
    else {
        const newCart = await new Cart({ name: request.body.name });
        const user = await User.findOne({_id: request.user._id });

        newCart.user = request.user._id;
        await newCart.save();
        newCart.populate('user');

        user.cart = newCart._id;
        await user.save();
        user.populate('cart');

        response.send(`Create new cart:
                    cart name: ${newCart.name}, 
                    user of cart is ${newCart.user.name}`);
    }
}

export const addProductToCart = async function(request, response){
    try {
        let userOfCart = await User.findOne({ _id: request.user._id });
        let cart = await Cart.findOne({ _id: request.params.id });
        if (cart) {
            response.send(`Cart name: ${product.name}`)
        }
        else {
            response.send(`Can't find such cart`)
        }
    }
    catch (err) {
        response.status(400).send(`Something wents wrong. Can't see the cart by id.`)
    }
}

export const getCartById = async function(request, response){
   try {
        let cart = await Cart.findOne({ _id: request.params.id });
        if (cart) {
            response.send(`Cart name: ${cart.name}`)
        }
        else {
            response.send(`Can't find such cart`)
        }
    }
    catch (err) {
        response.status(400).send(`Something wents wrong. Can't see the cart by id.`)
    }
}
