import RequestWithUser from "../../core/interfaces/requestWithUser.interface";
import { NextFunction, Response } from 'express';
import userModel from "../../core/models/user.model";
import WrongAuthenticationTokenException from "../../core/exceptions/WrongAuthenticationTokenException";
import AuthenticationTokenMissingException from "../../core/exceptions/AuthenticationTokenMissingException";
import HttpException from "../../core/exceptions/HttpException";

async function authMiddleware(request: RequestWithUser, response: Response, next: NextFunction) {
    // todo fix this because this is stupid
    // const authService = new DefaultAuthService();

    try {
        const verificationResponse = this.authService.checkIfAuthenticated(request);
        const id = verificationResponse._id;
        const user = await userModel.findById(id);
        if (user) {
            request.user = user;
            next();
        } else {
            next(new WrongAuthenticationTokenException());
        }
    } catch (error: AuthenticationTokenMissingException) {
        next(new AuthenticationTokenMissingException());
    } catch (error: WrongAuthenticationTokenException) {
        next(new WrongAuthenticationTokenException());
    } catch (e) {
        next(new HttpException(400, 'Something went wrong'));
    }
}

export default authMiddleware;