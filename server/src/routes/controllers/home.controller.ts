import Controller from "../../interfaces/controller.interface";
import { Router, Request, Response } from "express";
import * as express from "express";

class HomeController implements Controller {

    path: string;
    router: Router;

    constructor(path: string, router: express.Router) {
        this.path = path;
        this.router = router;
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