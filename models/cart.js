import mongoose from 'mongoose';
import autopopulate from 'mongoose-autopopulate';

const { Schema } = mongoose;

const cartSchema = new Schema({
    name: String,
    user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "user",
        autopopulate: true 
    },
    products: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: "product",
        autopopulate: true 
    }]
},
    { versionKey: false }
);

cartSchema.plugin(autopopulate);
const Cart = mongoose.model('cart', cartSchema);

export { cartSchema, Cart };