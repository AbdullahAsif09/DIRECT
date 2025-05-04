const categoriesmodel = require("../modals/categories");

exports.getCategories = async (req, res) => {
  const categories = await this.LocalFunctionGetCategories();
  res.json(categories);
};

exports.LocalFunctionGetCategories = async () => {
  try {
    const categories = await categoriesmodel.find({});
    return categories;
  } catch (error) {
    console.error(error);
    return [];
  }
};
