import Express from "express";
import Users from "./controllers/Users.js";
import Wall from "./controllers/Wall.js";
const Router = Express.Router();

Router.get("/", Users.index);
Router.get("/logoff", Users.logoff);
Router.get("/wall", Wall.index);

Router.post("/add-message", Wall.postMessage);
Router.post("/delete-message", Wall.removeMessage);
Router.post("/add-comment", Wall.postComment);
Router.post("/delete-comment", Wall.removeComment);

Router.post("/login", Users.loginProcess);
Router.post("/register", Users.registerProcess);

export default Router;