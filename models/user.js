import mongoose from 'mongoose';
import autopopulate from 'mongoose-autopopulate';
const { Schema } = mongoose;

const userSchema = new Schema({
    name: String,
    surname: String,
    email: String,
    password: String,
    role: {
        type: String,
        default: 'user'
    }
},
    { versionKey: false });

userSchema.plugin(autopopulate)
const User = mongoose.model('user', userSchema);

export { userSchema, User };
