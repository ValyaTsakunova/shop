import { Category } from '../models/category.js';
import { Product } from '../models/product.js';

export const createProduct = async function(request, response){
    let product = await Product.findOne({ name: request.body.name, price: request.body.price});
    let category = await Category.findOne({ name: request.body.category });
    if (product) {
        response.status(400).send(`Such product is already existed`)
    }
    else if(!category){
        response.send(`Can't find such category. Change it or create new one`)
    }
    else if(!product){
        const newProduct = await new Product({ name: request.body.name, price: request.body.price, category: request.body.category });
        await newProduct.save();
        category.products.push(newProduct._id);
        category.populate('product')
        await category.save();
        response.send(`Create new product:
                    product name: ${newProduct.name}
                    product price: ${newProduct.price}$`);
    }
    else{
        response.status(400).send(`Something wents wrong. Can't create this product.`)
    }
}

export const deleteProduct = async function(request, response){
    try {
        let product = await Product.findOne({ _id: request.params.id });
        let category = await Category.findOne({ name: product.category });
        if (product) {
            Product.deleteOne({ _id: request.params.id }, function (err, result) {
                if (err) return console.log(err);
            });
            for(let i = 0; i < category.products.length; i++){
                if(category.products[i]._id.toString() == product._id.toString()){
                    category.products.splice(category.products.indexOf(i), 1);
                    await category.save()
                }
            }
             response.send(`Delete product ${product.name}`);
        }
        else {
            response.send(`Can't find this product.`);
        }
    }
    catch (err) {
        response.status(400).send(`Something wents wrong. Can't delete this product.`)
    }
}

export const updateProduct = async function(request, response){
    try {
        let product = await Product.findOne({ _id: request.params.id });
        if (product) {
            Product.updateOne({ _id: request.params.id }, { price: request.body.price }, { new: true }, function (err, result) {
                if (err) return console.log(err);
            });
            response.send(`Update product ${product.name}`);
        }
        else {
            response.send(`Can't find this product`);
        }
    }
    catch (err) {
        response.status(400).send(`Something wents wrong. Can't update this product.`)
    }
}

export const getProductById = async function(request, response){
    try {
        let product = await Product.findOne({ _id: request.params.id });
        if (product) {
            response.send(`Product name: ${product.name}, price: ${product.price}$`)
        }
        else {
            response.send(`Can't find such product`)
        }
    }
    catch (err) {
        response.status(400).send(`Something wents wrong. Can't see the product by id.`)
    }
}

export const getAllProducts = async function(request, response){
    try {
        let products = await Product.find();
        if (products) {
            response.send(`${products}`)
        }
        else {
            response.send(`Can't get all products`)
        }
    }
    catch (err) {
        response.status(400).send(`Something wents wrong. Can't see all products.`)
    }
}