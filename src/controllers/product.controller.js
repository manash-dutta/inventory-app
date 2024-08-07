import ProductModel from "../models/product.model.js";

let products = ProductModel.get();
export default class ProductController {
  getProducts(req, res) {
    res.render("products", { products: products });
    // return res.sendFile(join(resolve(), "src", "views", "products.html"));
    // return res.sendFile(resolve("src", "views", "products.html"));
  }

  getAddProduct(req, res) {
    res.render("new-product", { errors: null });
  }

  // Need more clarity
  postAddNewProduct(req, res, next) {
    ProductModel.add(req.body);
    let products = ProductModel.get();
    res.render("products", { products });
  }

  getUpdateProductView(req, res, next) {
    // If product exist return view else return errors
    const id = req.params.id; // params allows us access to URL parameters like :id
    const productFound = ProductModel.getById(id);
    if (productFound) {
      res.render("update-product", { product: productFound, errors: null });
    } else {
      res.status(401).send("Product not found");
    }
  }
}
