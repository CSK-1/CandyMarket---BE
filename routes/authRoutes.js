const { body, validationResult } = require("express-validator");

Router.post(
  "/register",
  [body("username").isEmail(), body("password").length({ min: 6 })],
  (req, res, next) => {
    const errors = validationResult(req);
    if (!errors.isEmpty())
      return res.status(400).json({ errors: errors.array() });
    next();
  },
  register
);
