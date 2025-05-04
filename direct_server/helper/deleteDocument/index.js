/* delete mongo document using id and model */

const isMongooseModel = (variable) => {
  return variable && variable.prototype instanceof require("mongoose").Model;
};
exports.deleteDocument = async (doc, Model) => {
  try {
    /* check if model is mongodb model */
    if (!isMongooseModel(Model)) {
      return console.log("Invalid model. Please provide a Mongoose model. ");
    }
    if (!doc || !doc?._id) {
      return console.log(
        "Invalid document. Please provide a document with an id."
      );
    }
    const deletedDocument = await Model.findByIdAndDelete(doc?._id);
    if (!deletedDocument) {
      throw new Error("Document not found");
    }
    console.log(`Deleted document: ${deletedDocument}`);
  } catch (error) {
    console.error(`Error deleting document: ${error.message}`);
  }
};
