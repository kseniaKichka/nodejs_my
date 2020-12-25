import * as mongoose from "mongoose";

const postSchema = new mongoose.Schema({
    author: {
        ref: 'User',
        type: mongoose.Schema.Types.ObjectId
    },
    title: {
        type: String,
        required: true
    },
    description: {
        type: String,
        required: false
    },
    content: {
        type: String,
        required: false
    }
});

export default postSchema;