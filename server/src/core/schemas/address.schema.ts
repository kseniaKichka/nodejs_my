import * as mongoose from 'mongoose';

const addressSchema = new mongoose.Schema({
    city: String,
    street: String,
});

export default addressSchema;