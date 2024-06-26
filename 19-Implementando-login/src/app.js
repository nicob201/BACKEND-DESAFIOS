import express from "express";
import __dirname from "./utils.js";
import cartRouter from "./routes/cart.router.js";
import viewsRouter from "./routes/views.router.js";
import productRouter from "./routes/product.router.js";
import handlebars from "express-handlebars";
import dotenv from "dotenv";
import path from "path";
import session from 'express-session';
import bodyParser from 'body-parser';
import mongoose from './config/database.js';
import MongoStore from 'connect-mongo';
import sessionsRouter from './routes/api/sessions.js';
dotenv.config();

const app = express();
const PORT = process.env.PORT;
app.listen(PORT, console.log(`Server running on port ${PORT} OK`));

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

app.engine("handlebars", handlebars.engine());
app.set("views", __dirname + "/views");
app.set("view engine", "handlebars");
app.use("/public", express.static(path.join(__dirname, "public")));

app.use(session({
  secret: 'secretkey',
  resave: false,
  saveUninitialized: true,
  store: MongoStore.create({ mongoUrl: process.env.MONGO_URL }),
}));

app.use("/", viewsRouter);
app.use("/api/carts", cartRouter);
app.use("/api/products", productRouter);
app.use('/api/sessions', sessionsRouter);
