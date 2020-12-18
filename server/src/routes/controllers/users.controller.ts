import {Router, Request, Response} from "express";
import Controller from '../../interfaces/controller.interface';
import UserModel from '../../core/models/user.model';
import { Types } from "mongoose";
import HttpException from "../../core/exceptions/HttpException";
import validationMiddleware from "../middleware/validation.middleware";
import CreateUserDto from "../../core/dto/user.dto";
import authMiddleware from "../middleware/auth.middleware";
import 'dotenv/config';

class UsersController implements Controller {

    public router = Router();
    public path: string = '/users';

    constructor() {
        this.initializeRoutes();
    }

    private initializeRoutes() {
        this.router.use(this.path, authMiddleware);
        this.router.get(this.path, this.getAllUsers);
        this.router.post(this.path, validationMiddleware(CreateUserDto), this.createUSer);
        this.router.get(`${this.path}/:id`, this.getUserById);
    }

    private getAllUsers = async (request: Request, response: Response) => {
        const users = await UserModel.find({}, function (err) {
            if (err) {
                console.log('err')
                console.log(err)
                response.send(err).sendStatus(400);
            }
        });
        response.json(users);
    }

    private createUSer = async (request: Request, response: Response) => {
        const userData = request.body;
        console.log(userData)
        const userModel = new UserModel(userData);
        await userModel.save(function (err) {
            if (err) {
                console.log(err);
                response.sendStatus(400);
            }
        });
        console.log('saved!');
        response.sendStatus(200);
    }

    private getUserById = async (request: Request, response: Response) => {
        const userId = request.params.id;

        if (!Types.ObjectId.isValid(userId)) {
            throw new HttpException(400, 'Data is not valid')
        }

        const user = await UserModel.findById(userId, function (err) {
            if (err) {
                console.log('err')
                console.log(err)
                response.send(err)
            }
        });
        response.json(user)
    }

}

export default UsersController;