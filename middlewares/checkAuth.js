import Jwt from "jsonwebtoken";

const checkAuth = async (req, res, next) => {
  const token = req.header("x-auth-token");

  if (!token) {
    return res.status(400).json({
      errors: [
        {
          message: "No token found",
        },
      ],
    });
  }

  try {
    let user = Jwt.verify(token, "kjjh123j5hui59173h");
    req.user = user.email;
    next();
  } catch (error) {
    return res.status(400).json({
      errors: [
        {
          message: "Invalid credential",
        },
      ],
    });
  }

  const isAuthorized = true;

  if (isAuthorized) {
    next();
  } else {
    res.status(401);
    return res.json({
      errors: [
        {
          message: "Unauthorized",
        },
      ],
    });
  }
};

export { checkAuth };
