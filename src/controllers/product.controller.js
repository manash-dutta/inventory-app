import ProductModel from "../models/product.model.js";

let products = ProductModel.get();
export default class ProductController {
  getProducts(req, res) {
    res.render("products", { products: products });
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
    const id = req.params.id; // params allows us access to URL parameters like :id
    const productFound = ProductModel.getById(id);
    if (productFound) {
      res.render("update-product", { product: productFound, errors: null });
    } else {
      res.status(401).send("Product not found");
    }
  }

  postUpdateProduct(req, res) {
    ProductModel.update(req.body);
    let products = ProductModel.get();
    res.render("products", { products });
  }
}
