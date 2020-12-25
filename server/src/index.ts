import App from './app';
import HomeController from './routes/controllers/home.controller';
import 'dotenv/config';
import AuthenticationController from "./routes/controllers/authentication.controller";
import * as express from "express";
import UsersController from "./routes/controllers/users.controller";
import PostsController from "./routes/controllers/posts.controller";

const app = new App(
    [
        new HomeController('/', express.Router()),
        new UsersController('/users', express.Router()),
        new AuthenticationController('/auth', express.Router()),
        new PostsController('/posts', express.Router()),
    ],
);

app.listen();

