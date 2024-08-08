import express from "express";
import ejsLayouts from "express-ejs-layouts";
import UserController from "./src/controllers/user.controller.js";
import ProductController from "./src/controllers/product.controller.js";
import { resolve } from "path";
import { addProductFormValidate } from "./src/middlewares/validation.middleware.js";
import { uploadFile } from "./src/middlewares/file-upload-middleware.js";

// Create server
const server = express();
// Enabling static folder public
server.use(express.static("public"));
// Parse form data
server.use(express.urlencoded({ extended: true }));

// Set up view engine settings
server.set("view engine", "ejs");
server.set("views", resolve("src", "views"));

server.use(ejsLayouts);

// Create instances of Controllers
const productController = new ProductController();
const userController = new UserController();

// GET Routes
server.get("/login", userController.getLogin);
server.get("/register", userController.getRegister);
server.get("/", productController.getProducts);
server.get("/add-product", productController.getAddProduct);
server.get("/update-product/:id", productController.getUpdateProductView);

// POST Routes
server.post("/login", userController.postLogin);
server.post("/register", userController.postRegister);
server.post(
  "/",
  uploadFile.single("imageUrl"),
  addProductFormValidate,
  productController.postAddNewProduct
);
server.post(
  "/update-product",
  uploadFile.single("imageUrl"),
  productController.postUpdateProduct
);
server.post("/delete-product/:id", productController.postDeleteProduct);

server.use(express.static("src/views"));

server.listen(2200, () => {
  console.log("Server is listening at port 2200");
});
