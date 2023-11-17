const express = require("express");
const Router = express.Router();

const item_controller = require("../controllers/itemController");

Router.get("/create", item_controller.item_create_get);

Router.post("/create", item_controller.item_create_post);

Router.get("/:id", item_controller.item_detail);

Router.get("/:id/delete", item_controller.item_create_delete_post);

Router.post("/:id/delete", item_controller.item_create_delete_post);

module.exports = Router;
