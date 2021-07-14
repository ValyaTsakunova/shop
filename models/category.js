import mongoose from 'mongoose';
import autopopulate from 'mongoose-autopopulate';
const { Schema } = mongoose;

const categorySchema = new Schema({
    name: String,
},
    { versionKey: false }
);

categorySchema.plugin(autopopulate)
const Category = mongoose.model('category', categorySchema);

export { categorySchema, Category };
