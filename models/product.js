import mongoose from 'mongoose';
import autopopulate from 'mongoose-autopopulate';
const { Schema } = mongoose;

const productSchema = new Schema({
    name: String,
},
    { versionKey: false }
);

productSchema.plugin(autopopulate);
const Product = mongoose.model('product', productSchema);

export { productSchema, Product };