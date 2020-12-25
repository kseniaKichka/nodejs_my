import Controller from "../../interfaces/controller.interface";
import * as express from 'express';
import * as bcrypt from 'bcrypt';
import * as jwt from 'jsonwebtoken';
import userModel from "../../core/models/user.model";
import validationMiddleware from "../middleware/validation.middleware";
import LogInDto from "../../core/dto/logIn.dto";
import UserWithThatEmailAlreadyExistsException from "../../core/exceptions/userWithThatEmailAlreadyExistsException";
import WrongCredentialsException from "../../core/exceptions/WrongCredentialsException";
import TokenData from "../../core/interfaces/tokenData.interface";
import DataStoredInToken from "../../core/interfaces/dataStoredInToken.interface";
import UserInterface from "../../core/models/user.interface";
import UserDoesNotExistException from "../../core/exceptions/UserDoesNotExistException";
import 'dotenv/config';
import { Router } from "express";
import { Model } from "mongoose";
import { UserModelDocumentType } from "../../types/shared/types";

class AuthenticationController implements Controller {
    public path: string;
    public router: Router;
    private user: Model<UserModelDocumentType>;

    constructor(path: string, router: express.Router) {
        this.path = path;
        this.router = router;
        this.user = userModel;
        this.initializeRoutes();
    }

    private initializeRoutes() {
        this.router.post(`${this.path}/register`, validationMiddleware(LogInDto), this.registration);
        this.router.post(`${this.path}/login`, validationMiddleware(LogInDto), this.loggingIn);
        this.router.post(`${this.path}/refresh`, this.refreshToken);
    }

    private refreshToken = async (request: express.Request, response: express.Response, next: express.NextFunction) => {
        const refreshToken: string = request.body.refreshToken;
        const accessToken: string = request.body.accessToken;
        const accessTokenDecoded: any = await jwt.verify(accessToken, process.env.JWT_SECRET, {ignoreExpiration: true});

        const userExisted: UserInterface = await this.user.findOne({_id: accessTokenDecoded._id});

        if (userExisted) {

            const checkRefreshToken  = await bcrypt.compare(userExisted.email + userExisted._id, refreshToken);

            if (checkRefreshToken) {
                const tokenData: TokenData = this.createToken(userExisted);
                response.send({
                    accessToken: tokenData.token,
                    expiresIn: tokenData.expiresIn,
                    refreshToken: refreshToken
                });
            } else {
                next(new WrongCredentialsException());
            }
        } else {
            next(new UserDoesNotExistException());
        }

    }

    private registration = async (request: express.Request, response: express.Response, next: express.NextFunction) => {
        // should not be any
        const userData: any = request.body;

        if (await this.user.findOne({email: userData.email})) {
            next(new UserWithThatEmailAlreadyExistsException(userData.email));
        } else {
            const hashedPassword = await bcrypt.hash(userData.password, 10)
            await this.user.create({
                ...userData,
                password: hashedPassword
            });
            response.send('Ok');
        }
    }

    private loggingIn = async (request: express.Request, response: express.Response, next: express.NextFunction) => {
        const logInData: LogInDto = request.body;
        const userExist = await this.user.findOne({email: logInData.email});
        if (userExist) {
            const isPasswordMatching = await bcrypt.compare(logInData.password, userExist.password);
            if (isPasswordMatching) {
                userExist.password = undefined;
                const tokenData = this.createToken(userExist);
                const refreshToken = await bcrypt.hash(userExist.email + userExist._id, 10);
                console.log(tokenData);
                response.send({
                    accessToken: tokenData.token,
                    expiresIn: tokenData.expiresIn,
                    refreshToken: refreshToken
                });
            } else {
                next(new WrongCredentialsException());
            }
        } else {
            next(new WrongCredentialsException());
        }
    }

    private createToken(user: UserInterface): TokenData {
        const expiresIn: number = parseInt(process.env.JWT_EXPIRES_IN); // an hour
        const dataStoredInToken: DataStoredInToken = {
            _id: user._id,
        };
        return {
            expiresIn,
            token: jwt.sign(dataStoredInToken, process.env.JWT_SECRET, { expiresIn }),
        };
    }
}

export default AuthenticationController;