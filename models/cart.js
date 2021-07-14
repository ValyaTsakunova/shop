import mongoose from 'mongoose';
import autopopulate from 'mongoose-autopopulate';
const { Schema } = mongoose;

const cartSchema = new Schema({
    name: String,
},
    { versionKey: false }
);

cartSchema.plugin(autopopulate);
const Cart = mongoose.model('cart', cartSchema);

export { cartSchema, Cart };