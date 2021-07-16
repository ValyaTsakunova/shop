import { Cart } from '../models/cart.js';
import { User } from '../models/user.js';
import { Product } from '../models/product.js';

export const createCart = async function (request, response) {
    let cart = await Cart.findOne({ name: request.body.name });
    let user = await User.findOne({ _id: request.user._id });
    if (cart) {
        response.status(400).send(`Such cart is already existed`)
    }else if (user.cart ) {
        response.status(400).send(`One user can't have more than one cart.`)
    }
    else {
        const newCart = await new Cart({ name: request.body.name });

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

export const addProductToCart = async function (request, response) {
    try {
        let userOfCart = await User.findOne({ _id: request.user._id });
        userOfCart.populate('cart');
        await userOfCart.save();

        let cart = await Cart.findOne({ _id: userOfCart.cart._id });
        let product = await Product.findOne({ name: request.body.nameOfProduct });

        if (!cart) {
            response.send(`This user don't have a cart.`);
        } else if (!product) {
            response.send(`Can't find such product.`)
        }
        else if (product && cart) {
            cart.products.push(product._id.toString());
            cart.populate('product');
            await cart.save();
            response.send(`Product ${product.name}, price ${product.price}$ added to cart of user ${userOfCart.name}`)
        }
        else {
            response.send(`Can't find such cart`)
        }
    }
    catch (err) {
        response.status(400).send(`Something wents wrong. Can't add products to cart.`)
    }
}

export const getCartById = async function (request, response) {
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
