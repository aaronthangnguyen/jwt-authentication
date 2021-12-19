import express from "express";
import { authRoute } from "./routes/auth";
import { postRoute } from "./routes/post";

const app = express();
app.use(express.json());

app.use("/auth", authRoute);
app.use("/posts", postRoute);

app.get("/", (req, res) => {
  res.send("Hello World!");
});

app.listen(5001, () => {
  console.log("The server is running on port 5001...");
});
