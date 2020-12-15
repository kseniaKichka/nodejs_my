import Controller from "../../interfaces/controller.interface";
import { Router, Request, Response } from "express";

class HomeController implements Controller {

    path: string = '/';
    router: Router = Router();

    constructor() {
        this.initializeRoutes();
    }

    private initializeRoutes() {
        this.router.get(this.path, this.getHome);
    }

    private getHome = (request: Request, response: Response) => {
        console.log('home');
        response.send('home');
    }
}

export default HomeController;