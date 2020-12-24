import Users from "../../core/interfaces/user.interface";
import * as express from 'express';

class UsersController {
    public path: string;
    public router: express.Router;

    private users: Users[] = [{
        email: 'Ksenia@gmail.com',
        name: 'Ksenia',
        age: 28,
        gender: 'female'
    }];

    constructor(path: string, router: express.Router) {
        this.path = path;
        this.router = router;
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