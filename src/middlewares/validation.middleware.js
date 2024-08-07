import { body, validationResult } from "express-validator";

export const addProductFormValidate = async (req, res, next) => {
  const rules = [
    body("name").notEmpty().withMessage("Name is required"),
    body("price")
      .isFloat({ gt: 0 })
      .withMessage("Price must be a positive value."),
    body("imageUrl").isURL().withMessage("URL is invalid"),
  ];
  // Run the rules
  await Promise.all(rules.map((rule) => rule.run(req)));
  // Collect the rules, if there are any
  let validationErrors = validationResult(req);
  // Return the error messages if there are errors
  if (!validationErrors.isEmpty()) {
    res.render("new-product", { errors: validationErrors.array() });
  } else {
    next();
  }
};
