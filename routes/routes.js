import Express from "express";
import Users from "../controllers/Users.js";
import Wall from "../controllers/Wall.js";
import SessionIDChecker from "../helpers/SessionIDCheker.js";
const Router = Express.Router();

Router.get("/", SessionIDChecker.loggedIn, Users.index);
Router.get("/logoff", SessionIDChecker.notLoggedIn, Users.logoff);
Router.get("/wall", SessionIDChecker.notLoggedIn, Wall.index);

Router.post("/login", SessionIDChecker.loggedIn, Users.loginProcess);
Router.post("/register", SessionIDChecker.loggedIn, Users.registerProcess);

Router.post("/add-message", SessionIDChecker.notLoggedIn, Wall.postMessage);
Router.post("/delete-message", SessionIDChecker.notLoggedIn, Wall.removeMessage);
Router.post("/add-comment", SessionIDChecker.notLoggedIn, Wall.postComment);
Router.post("/delete-comment", SessionIDChecker.notLoggedIn, Wall.removeComment);


export default Router;