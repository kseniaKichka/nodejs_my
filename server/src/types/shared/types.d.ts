import mongoose from "mongoose";
import PostInterface from "../../core/models/post/post.interface";
import AdminInterface from "../../core/models/user/admin.interface";
import UserInterface from "../../core/models/user/user.interface";

export type UserModelDocumentType = UserInterface & mongoose.Document;

export type AdminModelDocumentType = AdminInterface & mongoose.Document;

export type PostModelDocumentType = PostInterface & mongoose.Document;