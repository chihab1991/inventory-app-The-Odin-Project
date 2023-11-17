const asyncHandler = require("express-async-handler");
const Item = require("../models/item");

exports.items_list = asyncHandler(async (req, res, next) => {
	const items = await Item.find();
	if (items.length === 0) {
		res.render("index", { title: "indexPage", msg: "no items add yet" });
	}
	res.render("index", { title: "indexPage", items: items });
});
