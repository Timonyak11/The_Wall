import Express from "express";
import { portConfig, sessionConfig } from "./config/appsConfig.js";
import bodyParser from "body-parser";
import routes from "./routes.js";

const app = Express();

app.use(bodyParser.urlencoded({ extended: true }));
app.use(sessionConfig);

app.use(routes);

app.set('views', './views');
app.set('view engine', 'ejs');

app.listen(portConfig);