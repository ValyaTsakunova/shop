import mongoose from 'mongoose';
import autopopulate from 'mongoose-autopopulate';
const { Schema } = mongoose;

const userSchema = new Schema({
    name: {
        type: String,
        default: "newUser"
    },
    surname: {
        type: String,
        default: "surname"
    },
    email: {
        type: String,
        default: "user@mail.ru"
    },
    password: {
        type: String,
        default: "111"
    },
    role: {
        type: String,
        default: 'user'
    },
    cart: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "cart",
        autopopulate: true 
    }
},
    { versionKey: false });

userSchema.plugin(autopopulate)
const User = mongoose.model('user', userSchema);

export { userSchema, User };
