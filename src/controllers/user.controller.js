import UserModel from "../models/user.model.js";
import ProductModel from "../models/product.model.js";

export default class UserController {
  // GET Methods
  getRegister(req, res) {
    res.render("user-register");
  }

  getLogin(req, res) {
    res.render("login", { error: null });
  }

  getUserLogout(req, res) {
    // On logout, destroy the session
    req.session.destroy((err) => {
      if (err) {
        console.log(err);
      } else {
        res.redirect("/login");
      }
    });
  }
  // POST Methods
  postRegister(req, res) {
    const { name, email, password } = req.body;
    UserModel.add(name, email, password);
    res.render("login", { error: null });
  }

  postLogin(req, res) {
    const { email, password } = req.body;
    const user = UserModel.isValidUser(email, password);
    if (!user) {
      return res.render("login", {
        error: "Invalid Credentials",
      });
    }
    req.session.userEmail = email;
    let products = ProductModel.get();
    res.render("products", { products, userEmail: req.session.userEmail });
  }
}
