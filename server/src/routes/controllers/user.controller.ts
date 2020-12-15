import Users from "../../core/interfaces/user.interface";
import * as express from 'express';

class UsersController {
    public path = '/users';
    public router = express.Router();

    private users: Users[] = [{
        email: 'Ksenia@gmail.com',
        name: 'Ksenia',
        age: 28,
        gender: 'female'
    }];


    constructor() {
        this.initializeRoutes();
    }

    public initializeRoutes() {
        this.router.get(this.path, this.getAllUsers);
    }

    getAllUsers = (req: express.Request, res: express.Response) => {
        res.send(this.users);
    }
}

export default UsersController;