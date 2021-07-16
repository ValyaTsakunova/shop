import mongoose from 'mongoose';
import autopopulate from 'mongoose-autopopulate';
const { Schema } = mongoose;

const categorySchema = new Schema({
    name: {
        type: String,
        default: 'newCategory'
    },
    products: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: "product",
        autopopulate: true 
    }]
},
    { versionKey: false }
);

categorySchema.plugin(autopopulate)
const Category = mongoose.model('category', categorySchema);

export { categorySchema, Category };
