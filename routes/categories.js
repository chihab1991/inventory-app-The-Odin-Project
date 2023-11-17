const express = require("express");
const router = express.Router();

const categories_controller = require("../controllers/categoriesController");

/* GET users listing. */
router.get("/", categories_controller.index);

router.get("/create", categories_controller.categories_create_get);

router.post("/create", categories_controller.categories_create_post);

router.get("/:id", categories_controller.categories_detail);

router.get("/:id/delete", categories_controller.categories_create_delete_get);

router.post("/:id/delete", categories_controller.categories_create_delete_post);

module.exports = router;
