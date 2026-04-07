import express, { json } from "express";
import userRoute from "./src/routes/userRoute.js";
// import todoRoute from "./src/routes/todoRoute.js";
const app = express();

app.use(json());

app.get("/", (req, res) => {
  res.send("hello world");
});

app.use("/users", userRoute);
// app.use("/todos", todoRoutes);

export default app;