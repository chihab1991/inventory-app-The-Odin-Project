const express = require("express");
const router = express.Router();

const items_controller = require("../controllers/itemsController");

/* GET home page. */
router.get("/", items_controller.items_list);

module.exports = router;
