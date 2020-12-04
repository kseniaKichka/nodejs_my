

/**
 * Required External Modules
 */
const express = require("express");
const path = require("path");

/**
 * App Variables
 */

const app = express();
// const port = process.env.PORT || "3001";
const port = 3001;
/**
 *  App Configuration
 */
app.set("views", path.join(__dirname, "views"));
app.set("view engine", "pug");
app.use(express.static(path.join(__dirname, "public")));

/**
 * Routes Definitions
 */

app.get("/", (req, res) => {
    console.log('s1')
    res.render("index", { title: "Home1q23" });
});

app.get("/user", (req, res) => {
    res.render("user", { title: "Profile", userProfile: { nickname: "Auth0" } });
});
/**
 * Server Activation
 */
app.listen(port, () => {
    console.log(`Listening to requests on http://localhost:8082`);
});
