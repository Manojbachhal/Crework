const express = require("express");
const Router = express.Router();
const authController = require("../controllers/userController");

Router.post("/login", async (req, res) => {
  const { email, password } = req.body;
  let response = await authController.login(email, password);
  res.status(response.status).send(response.res);
});

Router.post("/signup", async (req, res) => {
  const { name, email, password } = req.body;
  let response = await authController.register(name, email, password);
  res.status(response.status).send(response.res);
});
module.exports = Router;
