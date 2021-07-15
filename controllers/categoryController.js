import { Category } from '../models/category.js';

export const createCategory = async function(request, response){
    let category = await Category.findOne({ name: request.body.name });
    if (category) {
        response.status(400).send(`Such category is already existed`)
    }
    else {
        const newCategory = await new Category({ name: request.body.name});
        newCategory.save(function (err) {
            if (err) return console.log(err);
        });
        response.send(`Create new category:
                        category name: ${newCategory.name}`);
    }
}

export const deleteCategory = async function(request, response){
    try {
        let category = await Category.findOne({ _id: request.params.id });
        if (category) {
            Category.deleteOne({ _id: request.params.id }, function (err, result) {
                if (err) return console.log(err);
            });
            response.send(`Delete category ${category.name}`);
        }
        else {
            response.send(`Can't find this category.`);
        }
    }
    catch (err) {
        response.status(400).send(`Something wents wrong. Can't delete this category.`)
    }
}

export const updateCategory = async function(request, response){
    try {
        let category = await Category.findOne({ _id: request.params.id });
        if (category) {
            Category.updateOne({ _id: request.params.id }, { name: request.body.name }, { new: true }, function (err, result) {
                if (err) return console.log(err);
            });
            response.send(`Update category ${category.name}`);
        }
        else {
            response.send(`Can't find this category`);
        }
    }
    catch (err) {
        response.status(400).send(`Something wents wrong. Can't update this category.`)
    }
}

export const getCategoryById = async function(request, response){
    try {
        let category = await Category.findOne({ _id: request.params.id });
        if (category) {
            response.send(`Category name: ${category.name}`)
        }
        else {
            response.send(`Can't find such category`)
        }
    }
    catch (err) {
        response.status(400).send(`Something wents wrong. Can't see the category by id.`)
    }
}

export const getAllCategories = async function(request, response){
    try {
        let categories = await Category.find();
        if (categories) {
            response.send(`${categories}`)
        }
        else {
            response.send(`Can't get all categories`)
        }
    }
    catch (err) {
        response.status(400).send(`Something wents wrong. Can't see all categories.`)
    }
}