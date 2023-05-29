import Express from "express";
import session from "express-session";

const app = Express();

export const portConfig = {
    port: 8000
}

export const sessionConfig = app.use(session({
	secret: 'keyboard',
	resave: false,
	saveUninitialized: true
}));