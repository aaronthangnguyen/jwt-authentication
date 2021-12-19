import { Router } from "express";
import { check, validationResult } from "express-validator";
import { users } from "../db";
import bcrypt from "bcrypt";
import Jwt from "jsonwebtoken";

const router = Router();

const authValidator = [
  check("email", "Email is invalid").isEmail(),
  check("password", "Password is invalid").isStrongPassword(),
];

// POST sign up
router.post("/signup", authValidator, async (req, res) => {
  const { email, password } = req.body;

  // Validate format
  const errors = validationResult(req);

  if (!errors.isEmpty()) {
    return res
      .status(400)
      .json({ message: "Validation failed", errors: errors.array() });
  }

  // Validate existence
  let user = users.find((user) => {
    return user.email === email;
  });

  if (user) {
    return res.status(400).json({
      errors: [
        {
          message: "User already exists",
        },
      ],
    });
  }

  const token = Jwt.sign({ email }, "kjjh123j5hui59173h", {
    expiresIn: 360000,
  });

  // Hash password
  const hashedPassword = await bcrypt.hash(password, 10);
  users.push({ email: email, password: hashedPassword });

  return res.status(200).json({ token: token });
});

router.post("/login", async (req, res) => {
  const { email, password } = req.body;

  let user = users.find((user) => {
    return user.email === email;
  });

  if (!user) {
    return res.status(400).json({
      errors: [
        {
          message: "Invalid credential",
        },
      ],
    });
  }

  let isMatch = await bcrypt.compare(password, user.password);

  if (!isMatch) {
    return res.status(400).json({
      errors: [
        {
          message: "Invalid credential",
        },
      ],
    });
  }

  const token = Jwt.sign({ email }, "kjjh123j5hui59173h", {
    expiresIn: 360000,
  });

  res.status(200).json({ token });
});

// GET all users
router.get("/all", (req, res) => {
  return res.json(users);
});

export { router as authRoute };
