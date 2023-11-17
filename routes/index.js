const express = require("express");
const Router = express.Router();

Router.get("/", function (req, res) {
	res.redirect("/items/");
});

module.exports = Router;
