import Controller from "../../interfaces/controller.interface";
import * as express from 'express';
import userModel from "../../core/models/user.model";
import validationMiddleware from "../middleware/validation.middleware";
import LogInDto from "../../core/dto/logIn.dto";
import WrongCredentialsException from "../../core/exceptions/WrongCredentialsException";
import 'dotenv/config';
import { Router } from "express";
import { Model } from "mongoose";
import { UserModelDocumentType } from "../../types/shared/types";
import AuthServiceInterface from "../../services/auth/auth.service.interface";
import HttpException from "../../core/exceptions/HttpException";
import UserService from "../../services/user/user.service";

class AuthenticationController implements Controller {
    public path: string;
    public router: Router;
    private user: Model<UserModelDocumentType>;
    private authService: AuthServiceInterface;
    private userService: UserService;

    constructor(path: string, router: express.Router, authService: AuthServiceInterface) {
        this.path = path;
        this.router = router;
        this.authService = authService;
        this.user = userModel;
        this.userService = new UserService(this.authService, this.user)
        this.initializeRoutes();
    }

    private initializeRoutes() {
        this.router.post(`${this.path}/register`, validationMiddleware(LogInDto), this.registration);
        this.router.post(`${this.path}/login`, validationMiddleware(LogInDto), this.loggingIn);
        this.router.post(`${this.path}/refresh`, this.refreshToken);
    }

    private refreshToken = async (request: express.Request, response: express.Response, next: express.NextFunction) => {

        try {
            const result = await this.authService.refreshAccess(request.body);

            console.log(result);
            response.send(result);
        } catch (e) {
            if (e instanceof WrongCredentialsException) {
                next(new WrongCredentialsException());
            }
            next(new HttpException(400, 'Something went wrong'));
        }

    }

    private registration = async (request: express.Request, response: express.Response, next: express.NextFunction) => {
        // should not be any
        const userData: LogInDto = request.body;

        try {
            return await this.userService.createUser(userData);
        } catch (e) {
            next(e);
        }
    }

    private loggingIn = async (request: express.Request, response: express.Response, next: express.NextFunction) => {
        const logInData: LogInDto = request.body;
        const userExist = await this.user.findOne({email: logInData.email});

        if (userExist) {

            try {
                const authResult = await this.authService.logIn(userExist, logInData);

                console.log(authResult);
                response.send(authResult);

            } catch (e) {
                if (e instanceof WrongCredentialsException) {
                    next(new WrongCredentialsException());
                }
                next(new HttpException(400, 'Something went wrong'));
            }
        } else {
            next(new WrongCredentialsException());
        }
    }
}

export default AuthenticationController;