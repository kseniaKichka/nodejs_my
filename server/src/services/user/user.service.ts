import {Model, Query} from "mongoose";
import { UserModelDocumentType } from "../../types/shared/types";
import AuthServiceInterface from "../auth/auth.service.interface";
import SharedUserInterface from "../../core/models/sharedUserInterface";
import AuthInterface from "../../core/models/user/auth.interface";
import UserWithThatEmailAlreadyExistsException from "../../core/exceptions/userWithThatEmailAlreadyExistsException";
import * as bcrypt from "bcrypt";
import LogInDto from "../../core/dto/logIn.dto";
import UserInterface from "../../core/models/user/user.interface";

export default class UserService {
    private authService: AuthServiceInterface;
    private user: Model<UserModelDocumentType>;

    constructor(authService: AuthServiceInterface, user: Model<UserModelDocumentType>) {
        this.authService = authService;
        this.user = user;
    }

    async findOneById(id: string): Promise<SharedUserInterface & AuthInterface> {
        console.log('sdf')
        //todo ????? exec or not exec?????
        return this.user.findOne({_id: id}).exec();
    }

    async createUser(userData: LogInDto): Promise<UserModelDocumentType> {
        if (await this.user.findOne({email: userData.email})) {
            throw new UserWithThatEmailAlreadyExistsException(userData.email);
        } else {
            const hashedPassword = await bcrypt.hash(userData.password, 10)

            // todo is this OK??
            const newUser: UserInterface = <UserInterface>{
                ...userData,
                password: hashedPassword
            };

            return await this.user.create(newUser);
        }
    }
}