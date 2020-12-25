import { Router, Request, Response } from "express";
import Controller from '../../interfaces/controller.interface';
import UserModel from '../../core/models/user.model';
import { Types } from "mongoose";
import HttpException from "../../core/exceptions/HttpException";
import validationMiddleware from "../middleware/validation.middleware";
import CreateUserDto from "../../core/dto/user.dto";
import authMiddleware from "../middleware/auth.middleware";
import 'dotenv/config';
import * as express from "express";
import postModel from "../../core/models/post/post.model";

class UsersController implements Controller {
    public router: Router;
    public path: string;

    constructor(path: string, router: express.Router) {
        this.path = path;
        this.router = router;
        this.initializeRoutes();
    }

    private initializeRoutes() {
        // this.router.use(this.path, authMiddleware);
        this.router.get(this.path, this.getAllUsers);
        this.router.post(this.path, validationMiddleware(CreateUserDto), this.createUSer);
        this.router.get(`${this.path}/:id`, this.getUserById);
        this.router.get(`${this.path}/:id/posts`, this.getPostsByUser);
    }

    private getAllUsers = async (request: Request, response: Response) => {
        try {
            const users = await UserModel.find({});
            response.json(users);
        } catch (err) {
            console.log(err);
            response.sendStatus(400);
        }
    }

    private createUSer = async (request: Request, response: Response) => {
        const userData = request.body;

        const userModel = new UserModel(userData);

        try {
            await userModel.save();
            response.sendStatus(200);
        } catch (err) {
            console.log(err);
            response.sendStatus(400);
        }
    }

    private getUserById = async (request: Request, response: Response) => {
        const userId = request.params.id;

        if (!Types.ObjectId.isValid(userId)) {
            throw new HttpException(400, 'Data is not valid')
        }

        try {
            const user = await UserModel.findById(userId);

            response.json(user)
        } catch (err) {
            console.log(err)
            response.sendStatus(400);
        }
    }

    private getPostsByUser = async (request: Request, response: Response) => {
        const userId = request.params.id;

        if (!Types.ObjectId.isValid(userId)) {
            throw new HttpException(400, 'Data is not valid')
        }

        try {
            //todo how to use query helpers
            // const usersPosts = await postModel.find({}).byUser(userId).exec();
            const usersPosts = await postModel.find({author: userId}).populate('author', '-password');

            response.send(usersPosts);
        } catch (err) {
            console.log(err);
            response.sendStatus(400);
        }

    }
}

export default UsersController;