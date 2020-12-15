import * as mongoose from "mongoose";

export type UserDocument = mongoose.Document & {
    email: string,
    name: string,
    age: number,
    gender: string
}