import mongoose from 'mongoose';
import autopopulate from 'mongoose-autopopulate';
const { Schema } = mongoose;

const orderSchema = new Schema({
    number:{
        type: Number,
        default: 111
    },
    user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "user",
        autopopulate: true 
    },
    products:[{
        type: mongoose.Schema.Types.ObjectId,
        ref: "product",
        autopopulate: true 
    }]
},
    { versionKey: false }
);

orderSchema.plugin(autopopulate);
const Order = mongoose.model('order', orderSchema);

export { orderSchema, Order };