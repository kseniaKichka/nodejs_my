import UserInterface from "../../core/models/user.interface";
import mongoose from "mongoose";

export type UserModelDocumentType = UserInterface & mongoose.Document;