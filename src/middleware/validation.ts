import { body, validationResult } from "express-validator";
import { Request, Response, NextFunction } from "express";

const handleValidationErrors = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const errors = validationResult(req);

  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() });
  }
  next();
};

export const validateMyUserRequest = [
  body("name").isString().notEmpty().withMessage("Name must be a string"),

  body("addressLine1")
    .isString()
    .notEmpty()
    .withMessage("AddressLine1 must be a string"),

  body("city").isString().notEmpty().withMessage("City must be a string"),

  body("country").isString().notEmpty().withMessage("Country must be a string"),

  handleValidationErrors,
];

export const validateMyResraurantRequest = [
  body("restaurantName")
    .isString()
    .notEmpty()
    .withMessage("Restaurant name is required"),
  body("city").isString().notEmpty().withMessage("City name is required"),
  body("country").isString().notEmpty().withMessage("Country name is required"),
  body("deliveryPrice")
    .isFloat({ min: 0 })
    .withMessage("Delivery price must be a positive number"),
  body("estimatedDeliveryTime")
    .isInt({ min: 0 })
    .withMessage("Estimate delivery time must be a integer"),
  body("cuisines")
    .isArray()
    .withMessage("Cuisines must be an array")
    .not()
    .isEmpty()
    .withMessage("Cuisines array cannot be empty"),
  body("menuItems").isArray().withMessage("Menu items must be ann array"),
  body("menuItems.*.name")
    .isString()
    .notEmpty()
    .withMessage("Menu item name is required"),
  body("menuItems.*.price")
    .isFloat({ min: 0 })
    .withMessage("Menu item price is required and must be a postive number "),
  handleValidationErrors,
];
