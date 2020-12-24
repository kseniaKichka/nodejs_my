import App from './app';
import HomeController from './routes/controllers/home.controller';
import 'dotenv/config';
import AuthenticationController from "./routes/controllers/authentication.controller";
import * as express from "express";
import UsersController from "./routes/controllers/users.controller";

const app = new App(
    [
        new HomeController('/', express.Router()),
        new UsersController('/users', express.Router()),
        new AuthenticationController('/auth', express.Router())
    ],
);

app.listen();

