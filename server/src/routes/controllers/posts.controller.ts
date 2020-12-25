import Controller from "../../interfaces/controller.interface";
import * as express from "express";
import postModel from "../../core/models/post/post.model";
import validationMiddleware from "../middleware/validation.middleware";
import PostDto from "../../core/dto/post.dto";

class PostsController implements Controller {
    path: string;
    router: express.Router;

    constructor(path: string, router: express.Router) {
        this.path = path;
        this.router = router;
        this.initializeRoutes();
    }

    private initializeRoutes() {
        this.router.get(this.path, this.getPosts);
        this.router.post(this.path, validationMiddleware(PostDto), this.addPosts);
    }

    private getPosts = async (request: express.Request, response: express.Response) => {
        const postsModel = postModel;
        try {
            const posts = await postsModel.find({});
            response.send(posts)
        } catch (err) {
            console.log(err)
            response.send(err).sendStatus(400);
        }
    }

    private addPosts = async (request: express.Request, response: express.Response) => {
        const postsModel = postModel;
        const postData: PostDto = request.body;

        try {
            const createdPost = new postsModel({
                ...postData
            })
            const savedData = await createdPost.save();
            // const savedData = await postsModel.create(postData);
            console.log(postData);

            response.send(savedData);
        } catch (err) {
            console.log(err);
            response.sendStatus(400);
        }
    }
}

export default PostsController;