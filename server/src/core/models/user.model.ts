import * as mongoose from 'mongoose';
import { Model } from "mongoose";
import { UserModelDocumentType } from "../../types/shared/types";
import userSchema from "../schemas/user.schema";

//generic
const userModel: Model<UserModelDocumentType> = mongoose.model<UserModelDocumentType>('User', userSchema);

export default userModel;