import AuthServiceInterface from "./auth.service.interface";
import SharedUserInterface from "../../core/models/sharedUserInterface";
import * as bcrypt from "bcrypt";
import WrongCredentialsException from "../../core/exceptions/WrongCredentialsException";
import TokenData from "../../core/interfaces/tokenData.interface";
import DataStoredInToken from "../../core/interfaces/dataStoredInToken.interface";
import * as jwt from "jsonwebtoken";
import AuthInterface from "../../core/models/user/auth.interface";
import WrongAuthenticationTokenException from "../../core/exceptions/WrongAuthenticationTokenException";
import AuthenticationTokenMissingException from "../../core/exceptions/AuthenticationTokenMissingException";
import UserService from "../user/user.service";
import express from "express";
import LogInDto from "../../core/dto/logIn.dto";

export default class DefaultAuthService implements AuthServiceInterface {
    private userService: UserService;
    authType: string = 'default';

    checkIfAuthenticated<Request extends express.Request>(requestData: Request): DataStoredInToken {
        const token = requestData.get('Authorization');

        if (token === undefined) {
            throw new AuthenticationTokenMissingException();
        }

        try {
            return jwt.verify(token, process.env.JWT_SECRET) as DataStoredInToken;
        } catch (e) {
            throw new WrongAuthenticationTokenException();
        }
    }

    async refreshAccess(requestData: AuthInterface) : Promise<AuthInterface>{
        const accessToken: string = requestData.accessToken;
        const accessTokenDecoded: any = this.getDecodedToken(accessToken);

        const userExisted: AuthInterface & SharedUserInterface = await this.userService.findOneById(accessTokenDecoded._id)

        if (!userExisted) {
            throw new WrongCredentialsException();
        }

        const checkRefreshToken  = await bcrypt.compare(userExisted.email + userExisted._id, requestData.refreshToken);

        if (checkRefreshToken) {
            const tokenData: TokenData = DefaultAuthService.createToken(userExisted);
            return {
                accessToken: tokenData.token,
                expiresIn: tokenData.expiresIn,
                refreshToken: requestData.refreshToken
            } as AuthInterface;
        } else {
            throw new WrongCredentialsException();
        }
    }

    async logIn(user: SharedUserInterface, requestData: LogInDto): Promise<AuthInterface> {

        const isPasswordMatching = await bcrypt.compare(requestData.password, user.password);

        if (isPasswordMatching) {
            user.password = undefined;
            const tokenData = DefaultAuthService.createToken(user);
            const refreshToken = await DefaultAuthService.createUserHash(user);
            console.log(tokenData);
            return {
                accessToken: tokenData.token,
                expiresIn: tokenData.expiresIn,
                refreshToken: refreshToken
            } as AuthInterface;
        } else {
            throw new WrongCredentialsException();
        }
    }

    private static async createUserHash(user: SharedUserInterface) {
        return await bcrypt.hash(user.email + user._id, 10);
    }

    private static createToken(user: SharedUserInterface): TokenData {
        const expiresIn: number = parseInt(process.env.JWT_EXPIRES_IN); // an hour
        const dataStoredInToken: DataStoredInToken = {
            _id: user._id,
        };
        return {
            expiresIn,
            token: jwt.sign(dataStoredInToken, process.env.JWT_SECRET, { expiresIn }),
        };
    }

    async getDecodedToken(token: string): Promise<DataStoredInToken> {
        try {
            const result = await jwt.verify(token, process.env.JWT_SECRET, {ignoreExpiration: true});

            if (typeof result == 'string') {
                console.log('STRING')
            }

            return result as DataStoredInToken
        } catch (e) {
            throw new e;
        }
    }

}
