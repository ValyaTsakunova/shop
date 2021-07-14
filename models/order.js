import mongoose from 'mongoose';
import autopopulate from 'mongoose-autopopulate';
const { Schema } = mongoose;

const orderSchema = new Schema({
    name: String,
},
    { versionKey: false }
);

orderSchema.plugin(autopopulate);
const Order = mongoose.model('order', orderSchema);

export { orderSchema, Order };