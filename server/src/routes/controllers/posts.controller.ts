import Controller from "../../interfaces/controller.interface";
import * as express from "express";
import validationMiddleware from "../middleware/validation.middleware";
import PostDto from "../../core/dto/post.dto";
import PostService from "../../services/post/post.service";

class PostsController implements Controller {
    path: string;
    router: express.Router;
    private postService: PostService;

    constructor(path: string, router: express.Router) {
        this.path = path;
        this.router = router;
        this.postService = new PostService();
        this.initializeRoutes();
    }

    private initializeRoutes() {
        this.router.get(this.path, this.getPosts);
        this.router.post(this.path, validationMiddleware(PostDto), this.addPosts);
    }

    private getPosts = async (request: express.Request, response: express.Response) => {
        try {
            const posts = await this.postService.getPosts();
            response.send(posts)
        } catch (err) {
            console.log(err)
            response.send(err).sendStatus(400);
        }
    }

    private addPosts = async (request: express.Request, response: express.Response) => {
        const postData: PostDto = request.body;

        try {
            const savedData = await this.postService.createPost(postData);

            response.send(savedData);
        } catch (err) {
            console.log(err);
            response.sendStatus(400);
        }
    }
}

export default PostsController;