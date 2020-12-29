import SharedUserInterface from "../../core/models/sharedUserInterface";
import AuthInterface from "../../core/models/user/auth.interface";
import {Request} from "express";
import DataStoredInToken from "../../core/interfaces/dataStoredInToken.interface";

interface AuthServiceInterface {
    authType: string;

    logIn(user: SharedUserInterface, requestData: object): Promise<AuthInterface>;

    refreshAccess(requestData: object): Promise<AuthInterface>;

    checkIfAuthenticated<T extends Request>(requestData: T): DataStoredInToken;

    getDecodedToken(token: string): Promise<DataStoredInToken>;
}

export default AuthServiceInterface;