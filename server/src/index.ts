import * as express from "express";
import mongoose from 'mongoose';
import path from "path";

import userController from "./routes/controllers/user.controller";

let app = express();
const port = 3001;
/**
 *  App Configuration
 */

// mongoose.connect('mongodb://localhost:27018', {useNewUrlParser: true});
mongoose.connect('mongodb://mongo/test', {useNewUrlParser: true});
const db = mongoose.connection;
db.on('error', console.error.bind(console, 'connection error:'));
db.once('open', function() {
    // we're connected!
    console.log('we\'re connected!');
});

app.set("views", path.join(__dirname, "views"));
app.set("view engine", "pug");
app.use(express.static(path.join(__dirname, "public")));


app.use('/users', userController.router);

/**
 * Server Activation
 */
app.listen(port, () => {
    console.log(`Listening to requests on http://localhost:8082`);
});

