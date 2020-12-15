import {Router, Request, Response, request} from "express";
import Controller from '../../interfaces/controller.interface';
import UserModel from '../../core/models/user.model';
import * as mongoose from "mongoose";

class UsersController implements Controller {

    public router = Router();
    public path: string = '/users';

    constructor() {
        this.initializeRoutes();
    }

    private initializeRoutes() {
        this.router.get(this.path, this.getAllUsers);
        this.router.post(this.path, this.createUSer);
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

    private getUserById =  (request: Request, response: Response) => {
        const userId = request.params.id;
        console.log(userId)
        const user =  UserModel.findById(userId, function (err, userIn) {
            if (err) {
                console.log('err')
                console.log(err)
                response.send(err)
            }
            if (userIn) {
                console.log(userIn)
            }
        });
        // response.json(user)
    }

}

export default UsersController;