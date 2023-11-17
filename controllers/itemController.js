const asyncHandler = require("express-async-handler");
const Item = require("../models/item");
const Categories = require("../models/categories");
const { body, validationResult } = require("express-validator");

exports.item_detail = asyncHandler(async (req, res, next) => {
	const item = await Item.findOne({ _id: req.params.id }).exec();
	console.log(item);
	if (!item) {
		res.render("item_detail", {
			title: "Item Detail",
			error: "there is no such item",
		});
	}
	const category = await Categories.findOne({ _id: item.category });
	if (item && category) {
		res.render("item_detail", {
			title: "Item Detail",
			item: item,
			category: category,
		});
	}
});

exports.item_create_get = asyncHandler(async (req, res, next) => {
	const categories = await Categories.find().exec();
	res.render("item_create_form", {
		title: "Create Item",
		categories: categories,
	});
});

exports.item_create_post = [
	body("productName")
		.trim()
		.isLength({ min: 3, max: 100 })
		.escape()
		.withMessage("product name must be between 3 & 100 characters long.")
		.isAlphanumeric()
		.withMessage("product must be in letters and numbers only."),
	body("description", "please write a concise description.")
		.trim()
		.isLength({ min: 3 })
		.escape()
		.isAlphanumeric(),
	body("numberInStock", "Number is stock must be a valid number")
		.trim()
		.escape()
		.isNumeric(),
	body("price", "price must be a valid number.").trim().escape().isNumeric(),
	body("category", "Please choose the correct category.").trim().escape(),
	asyncHandler(async (req, res, next) => {
		const errors = validationResult(req);

		const newItem = new Item({
			name: req.body.productName,
			description: req.body.description,
			category: req.body.category,
			price: req.body.price,
			numberInStock: req.body.numberInStock,
		});
		if (!errors.isEmpty()) {
			const categories = await Categories.find().exec();
			res.render("item_create_form", {
				title: "Create Item",
				categories: categories,
				newItem: newItem,
				errors: errors.array(),
			});
		} else {
			const itemExists = await Item.findOne({
				name: req.body.productName,
			}).exec();
			if (itemExists) {
				res.redirect(itemExists.url);
			} else {
				await newItem.save();
				console.log("1");
				res.redirect(newItem.url);
			}
		}
	}),
];

exports.item_create_delete_post = asyncHandler(async (req, res, next) => {
	const deletedItem = await Item.findOneAndDelete({ _id: req.params.id });
	if (deletedItem) {
		res.redirect("/items/");
	} else {
		res.redirect("/items/");
	}
});
exports.item_modify_get = asyncHandler(async (req, res, next) => {
	const [item, categories] = await Promise.all([
		Item.findOne({ _id: req.params.id }),
		Categories.find(),
	]);
	res.render("item_modify_form", {
		title: "Modify Item",
		categories: categories,
		newItem: item,
	});
});
exports.item_modify_post = [
	body("productName")
		.trim()
		.isLength({ min: 3, max: 100 })
		.escape()
		.withMessage("product name must be between 3 & 100 characters long.")
		.isAlphanumeric()
		.withMessage("product must be in letters and numbers only."),
	body("description", "please write a concise description.")
		.trim()
		.isLength({ min: 3 })
		.escape()
		.isAlphanumeric(),
	body("numberInStock", "Number is stock must be a valid number")
		.trim()
		.escape()
		.isNumeric(),
	body("price", "price must be a valid number.").trim().escape().isNumeric(),
	body("category", "Please choose the correct category.").trim().escape(),
	asyncHandler(async (req, res, next) => {
		const errors = validationResult(req);
		const modifiedItem = {
			name: req.body.productName,
			description: req.body.description,
			category: req.body.category,
			price: req.body.price,
			numberInStock: req.body.numberInStock,
		};
		if (!errors.isEmpty()) {
			const categories = await Categories.find().exec();
			res.render("item_create_form", {
				title: "Create Item",
				categories: categories,
				newItem: modifiedItem,
				errors: errors.array(),
			});
		} else {
			const newItem = await Item.findOneAndUpdate(
				{
					name: req.body.productName,
				},
				modifiedItem
			);
			res.redirect(newItem.url);
		}
	}),
];
