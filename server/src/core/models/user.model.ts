import * as mongoose from 'mongoose';
import { UserModelDocumentType } from "../../types/shared/types";
import userSchema from "../schemas/user.schema";

//generic
const userModel: mongoose.Model<UserModelDocumentType> = mongoose.model<UserModelDocumentType>('User', userSchema);

export default userModel;