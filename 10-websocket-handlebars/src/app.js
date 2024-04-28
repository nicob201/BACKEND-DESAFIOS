import express from "express";
import __dirname from "./utils.js";
import handlebars from "express-handlebars";
import viewsRouter from "./routes/views.router.js";
import { Server } from "socket.io";

import products from "./public/js/index.js";

const app = express();
const PORT = 8080;
const httpServer = app.listen(
  PORT,
  console.log(`Server running on port ${PORT} OK!`)
);

const io = new Server(httpServer);

app.engine("handlebars", handlebars.engine());
app.set("views", __dirname + "/views");
app.set("view engine", "handlebars");
app.use(express.static(__dirname + "/public"));

app.use("/", viewsRouter);

io.on("connection", (socket) => {
  console.log("New client connected");

  socket.emit("updateProducts", products);

  socket.on("addProduct", (newProduct) => {
    newProduct.id = products.length + 1;
    products.push(newProduct);
    io.emit("updateProducts", products);
  });

  socket.on("deleteProduct", (productId) => {
    const index = products.findIndex(
      (product) => product.id === parseInt(productId)
    );
    if (index !== -1) {
      products.splice(index, 1);
      io.emit("updateProducts", products);
    }
  });
});
