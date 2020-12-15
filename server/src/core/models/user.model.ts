import * as mongoose from 'mongoose';
import UserInterface from './user.interface';

const userSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true
    },
    age: {
        type: Number,
        required: true
    },
    gender: {
        type: String,
        required: true
    }
});

const userModel = mongoose.model<UserInterface & mongoose.Document>('User', userSchema);

export default userModel;