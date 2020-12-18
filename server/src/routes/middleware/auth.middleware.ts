import RequestWithUser from "../../core/interfaces/requestWithUser.interface";
import { NextFunction, Response } from 'express';
import * as jwt from 'jsonwebtoken';
import DataStoredInToken from "../../core/interfaces/dataStoredInToken.interface";
import userModel from "../../core/models/user.model";
import WrongAuthenticationTokenException from "../../core/exceptions/WrongAuthenticationTokenException";
import AuthenticationTokenMissingException from "../../core/exceptions/AuthenticationTokenMissingException";

async function authMiddleware(request: RequestWithUser, response: Response, next: NextFunction) {
    const token = request.get('Authorization');
    if (token) {
        try {
            const verificationResponse = jwt.verify(token, process.env.JWT_SECRET) as DataStoredInToken;
            const id = verificationResponse._id;
            const user = await userModel.findById(id);
            if (user) {
                request.user = user;
                next();
            } else {
                next(new WrongAuthenticationTokenException());
            }
        } catch (error) {
            next(new WrongAuthenticationTokenException());
        }
    } else {
        next(new AuthenticationTokenMissingException());
    }
}

export default authMiddleware;