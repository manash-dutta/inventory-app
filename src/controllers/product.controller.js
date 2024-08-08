import ProductModel from "../models/product.model.js";

export default class ProductController {
  getProducts(req, res, next) {
    let products = ProductModel.get();
    res.render("products", { products: products });
  }

  getAddProduct(req, res, next) {
    res.render("new-product", { errors: null });
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


  postAddNewProduct(req, res, next) {
    const { name, desc, price } = req.body;
    const imageUrl = "images/" + req.file.filename;
    ProductModel.add(name, desc, price, imageUrl);
    let products = ProductModel.get();
    res.render("products", { products });
  }

  postUpdateProduct(req, res) {
    ProductModel.update(req.body);
    let products = ProductModel.get();
    res.render("products", { products });
  }

  postDeleteProduct(req, res) {
    const id = req.params.id;
    let products = ProductModel.get();
    const productFound = ProductModel.getById(id);
    if (!productFound) {
      return res.status(401).send("Product not found");
    }
    ProductModel.delete(id);
    res.render("products", { products });
  }
}



// postUpdateProduct(req, res) {
  //   const { id, name, desc, price } = req.body;
  //   let imageUrl;

  //   // Check if a new file is uploaded
  //   if (req.file) {
  //     imageUrl = "images/" + req.file.filename;
  //   } else {
  //     // If no new file is uploaded, retain the existing imageUrl
  //     const existingProduct = ProductModel.getById(id);
  //     imageUrl = existingProduct.imageUrl;
  //   }

  //   ProductModel.update(id, name, desc, price, imageUrl);

  //   const products = ProductModel.get();
  //   res.render("products", { products });
  // }