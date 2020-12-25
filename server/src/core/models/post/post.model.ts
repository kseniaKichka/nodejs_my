import mongoose from "mongoose";
import { PostModelDocumentType } from "../../../types/shared/types";
import postSchema from "../../schemas/post.schema";

postSchema.query.byUser = function (id) {
    return this.where({authorId: id});
}

const postModel: mongoose.Model<PostModelDocumentType> = mongoose.model<PostModelDocumentType>('Post', postSchema);

export default postModel;