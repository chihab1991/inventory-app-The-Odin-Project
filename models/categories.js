const mongoose = require("mongoose");

const Schema = mongoose.Schema;

const CategoriesSchema = new Schema({
	categoryName: { type: String, required: true, minLength: 3, maxLength: 100 },
	description: { type: String, required: true, minLength: 3 },
});

CategoriesSchema.virtual("url").get(function () {
	return `/categories/${this._id}`;
});
module.exports = mongoose.model("Categories", CategoriesSchema);
