import mongoose from "mongoose";
import addressSchema from "./address.schema";

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
        required: false
    },
    gender: {
        type: String,
        required: false
    },
    password: {
        type: String,
        required: false
    },
    address: {
        type: addressSchema,
        required: false
    }
});

export default userSchema;
