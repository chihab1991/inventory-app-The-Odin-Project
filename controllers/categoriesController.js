const asyncHandler = require("express-async-handler");
const { body, validationResult } = require("express-validator");
const Categories = require("../models/categories");

exports.index = asyncHandler(async (req, res, next) => {
	res.send("all categories");
});

exports.categories_detail = asyncHandler(async (req, res, next) => {
	const category = await Categories.findOne({ _id: req.params.id }).exec();
	console.log(category);
	console.log(1);
	if (category == null) {
		// const err = new Error("category not fount");
		// err.status = 404;
		// next(err);
	}
	res.render("categories_detail", { title: "category", category: category });
});

exports.categories_create_get = asyncHandler(async (req, res, next) => {
	res.render("categories_create_form", { title: "Create New Category" });
});

exports.categories_create_post = [
	body("categoryName")
		.trim()
		.isLength({ min: 3, max: 100 })
		.escape()
		.withMessage("Category Must be specified!!!")
		.isAlphanumeric()
		.withMessage("Category should only be in letters and numbers"),
	body("description", "Please write a concise description!!")
		.trim()
		.isLength({ min: 3 })
		.escape(),
	asyncHandler(async (req, res, next) => {
		const errors = validationResult(req);
		const newCategory = new Categories({
			categoryName: req.body.categoryName,
			description: req.body.description,
		});
		if (!errors.isEmpty()) {
			res.render("categories_create_form", {
				title: "Create New Category",
				newCategory: newCategory,
				errors: errors.array(),
			});
			return;
		} else {
			const categoryExists = await Categories.findOne({
				categoryName: req.body.categoryName,
			});

			if (categoryExists) {
				res.redirect(categoryName.url);
			} else {
				await newCategory.save();
				res.redirect(newCategory.url);
			}

			res.redirect(newCategory.url);
		}
	}),
];

exports.categories_create_delete_get = asyncHandler(async (req, res, next) => {
	res.send("delete category");
});

exports.categories_create_delete_post = asyncHandler(async (req, res, next) => {
	res.send("delete item from DB");
});
