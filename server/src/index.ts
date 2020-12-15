// import 'dotenv/config';
import App from './app';
import UserController from './routes/controllers/users.controller';
import HomeController from './routes/controllers/home.controller';

import mongoose from 'mongoose';
import 'dotenv/config';

const {
    MONGO_CONNECTION,
} = process.env;

mongoose.connect('mongodb://mongo/test', {useNewUrlParser: true});
const db = mongoose.connection;
db.on('error', console.error.bind(console, 'connection error:'));
db.once('open', function() {
    // we're connected!
    console.log('we\'re connected!');
});

// mongoose.connect(`mongodb://${MONGO_CONNECTION}`, {useNewUrlParser: true,  useUnifiedTopology: true});
//
//
// mongoose.connection.once("open", function() {
//     console.log("MongoDB database connection established successfully");
// });

const app = new App(
    [
        new UserController(),
        new HomeController()
    ],
);

app.listen();

//
//
// /**
//  * Required External Modules
//  */
// const express = require("express");
// // import * as express from 'express';
// const path = require("path");
// // const users = require("./routes/controllers/usersController");
//
//
// /**
//  * App Variables
//  */
// //test
//
// const app = express();
// // const port = process.env.PORT || "3001";
// const port = 3001;
// /**
//  *  App Configuration
//  */
//
// app.set("views", path.join(__dirname, "views"));
// app.set("view engine", "pug");
// app.use(express.static(path.join(__dirname, "public")));
//
//
//
// /**
//  * Routes Definitions
//  */
// app.get("/", (req, res) => {
//     console.log('home')
//     res.render("index", { title: "Home1q23" });
// });
//
// app.get("/user", (req, res) => {
//     res.render("user", { title: "Profile", userProfile: { nickname: "Auth0" } });
// });
//
// app.get('/example/b', function (req, res, next) {
//     console.log('the response will be sent by the next function ...');
//     next();
// }, function (req, res) {
//     res.send('Hello from B!');
// });
//
// // app.use("/users", users);
//
// /**
//  * Server Activation
//  */
// app.listen(port, () => {
//     console.log(`Listening to requests on http://localhost:8082`);
// });
