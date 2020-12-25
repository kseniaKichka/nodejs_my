import mongoose from "mongoose";
import UserInterface from "../../core/models/user.interface";
import PostInterface from "../../core/models/post/post.interface";

export type UserModelDocumentType = UserInterface & mongoose.Document;

export type PostModelDocumentType = PostInterface & mongoose.Document;