import PostDto from "../../core/dto/post.dto";
import { PostModelDocumentType } from "../../types/shared/types";
import { Model } from "mongoose";
import PostInterface from "../../core/models/post/post.interface";
import postModel from "../../core/models/post/post.model";

export default class PostService {
    private postModel: Model<PostModelDocumentType> = postModel;

    async createPost(postData: PostDto): Promise<PostModelDocumentType> {
        // todo есть обьект с данными, я хочу записать его в postModel, значит мне нужно создать обьект типа PostInterface . как его правильно создать??
        const dataForCreating: PostInterface = <PostInterface>{
            ...postData,
            author: postData.authorId
        };

        return await this.postModel.create(dataForCreating);
    }

    async getPosts(): Promise<PostModelDocumentType[]> {
        return this.postModel.find({}).exec();
    }
}