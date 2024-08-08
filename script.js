import express from "express";
import ejsLayouts from "express-ejs-layouts";
import UserController from "./src/controllers/user.controller.js";
import ProductController from "./src/controllers/product.controller.js";
import { resolve } from "path";
import { addProductFormValidate } from "./src/middlewares/validation.middleware.js";
import { uploadFile } from "./src/middlewares/file-upload-middleware.js";
import session from "express-session";
import auth from "./src/middlewares/auth.middleware.js";
import cookieParser from "cookie-parser";
import { setLastVisit } from "./src/middlewares/lastVisit.middleware.js";

// Create server
const server = express();

// Set up view engine settings
server.set("view engine", "ejs");
server.set("views", resolve("src", "views"));

// Configure Middlewares
server.use(express.static("src/views"));
server.use(express.static("public"));
server.use(express.urlencoded({ extended: true })); // Parse form data
server.use(ejsLayouts);
server.use(cookieParser());
// server.use(setLastVisit);
server.use(
  session({
    secret: "secretKey123",
    resave: false,
    saveUninitialized: true,
    cookie: { secure: false },
  })
);


// Create instances of Controllers
const productController = new ProductController();
const userController = new UserController();

// GET Routes
server.get("/login", userController.getLogin);
server.get("/register", userController.getRegister);
server.get("/", auth, setLastVisit, productController.getProducts);
server.get("/add-product", auth, productController.getAddProduct);
server.get("/update-product/:id", auth, productController.getUpdateProductView);
server.get("/logout", userController.getUserLogout)

// POST Routes
server.post("/login", userController.postLogin);
server.post("/register", userController.postRegister);
server.post(
  "/",
  auth,
  uploadFile.single("imageUrl"),
  addProductFormValidate,
  productController.postAddNewProduct
);
server.post(
  "/update-product",
  auth,
  uploadFile.single("imageUrl"),
  productController.postUpdateProduct
);
server.post("/delete-product/:id", auth, productController.postDeleteProduct);

// Setting server to listen to port
server.listen(2200, () => {
  console.log("Server is listening at port 2200");
});
