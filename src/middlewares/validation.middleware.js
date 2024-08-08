import { body, validationResult } from "express-validator";

export const addProductFormValidate = async (req, res, next) => {
  const rules = [
    body("name").notEmpty().withMessage("Name is required"),
    body("price")
      .isFloat({ gt: 0 })
      .withMessage("Price must be a positive value."),
    body("imageUrl").custom((value, { req }) => {
      if (!req.file) {
        throw new Error("Image is required");
      }
      return true;
    }),
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


/* 
import { body, validationResult } from "express-validator";

const validateProductForm = () => {
  return [
    body("name").notEmpty().withMessage("Name is required"),
    body("price")
      .isFloat({ gt: 0 })
      .withMessage("Price must be a positive value."),
    body("imageUrl").custom((value, { req }) => {
      if (!req.file && !req.body.imageUrl) {
        throw new Error("Image is required");
      }
      return true;
    }),
  ];
};

const handleValidationErrors = (viewName) => {
  return (req, res, next) => {
    const validationErrors = validationResult(req);
    if (!validationErrors.isEmpty()) {
      return res.render(viewName, { product: req.body, errors: validationErrors.array() });
    }
    next();
  };
};

export { validateProductForm, handleValidationErrors };

*/