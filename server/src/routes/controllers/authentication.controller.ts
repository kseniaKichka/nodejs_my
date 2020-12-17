import Controller from "../../interfaces/controller.interface";
import * as express from 'express';
import * as bcrypt from 'bcrypt';
import * as jwt from 'jsonwebtoken';
import userModel from "../../core/models/user.model";
import validationMiddleware from "../middleware/validation.middleware";
import CreateUserDto from "../../core/dto/user.dto";
import LogInDto from "../../core/dto/logIn.dto";
import UserWithThatEmailAlreadyExistsException from "../../core/exceptions/userWithThatEmailAlreadyExistsException";
import WrongCredentialsException from "../../core/exceptions/WrongCredentialsException";
import TokenData from "../../core/interfaces/tokenData.interface";
import DataStoredInToken from "../../core/interfaces/dataStoredInToken.interface";
import UserInterface from "../../core/models/user.interface";
import UserDoesNotExistException from "../../core/exceptions/UserDoesNotExistException";
import {TokenExpiredError} from "jsonwebtoken";

class AuthenticationController implements Controller {
    public path = '/auth';
    public router = express.Router();
    private user = userModel;


    constructor() {
        this.initializeRoutes();
    }

    private initializeRoutes() {
        this.router.post(`${this.path}/register`, validationMiddleware(LogInDto), this.registration);
        this.router.post(`${this.path}/login`, validationMiddleware(LogInDto), this.loggingIn);
        this.router.post(`${this.path}/refresh`, this.refreshToken);
    }

    private refreshToken = async (request: express.Request, response: express.Response, next: express.NextFunction) => {
        const refreshToken = request.body.refreshToken;
        const accessToken = request.body.accessToken;
        const accessTokenDecoded: any = await jwt.verify(accessToken, 'testString', {ignoreExpiration: true});

        const userExisted: UserInterface = await this.user.findOne({_id: accessTokenDecoded._id});

        if (userExisted) {

            const checkRefreshToken = await bcrypt.compare(userExisted.email + userExisted._id, refreshToken);

            if (checkRefreshToken) {
                const tokenData = this.createToken(userExisted);
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
        const userData: CreateUserDto = request.body;

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
        const expiresIn = 20; // an hour
        const secret = 'testString';
        const dataStoredInToken: DataStoredInToken = {
            _id: user._id,
        };
        return {
            expiresIn,
            token: jwt.sign(dataStoredInToken, secret, { expiresIn }),
        };
    }
}

export default AuthenticationController;