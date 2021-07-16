import mongoose from 'mongoose';
import autopopulate from 'mongoose-autopopulate';
const { Schema } = mongoose;

const productSchema = new Schema({
    name: {
        type: String,
        default: "newProduct"
    },
    price: {
        type: Number, 
        default: 5   
    },
    category: {
        type: String,
        default: "newCategory",
        require: true
    }
},
    { versionKey: false }
);

productSchema.plugin(autopopulate);
const Product = mongoose.model('product', productSchema);

export { productSchema, Product };