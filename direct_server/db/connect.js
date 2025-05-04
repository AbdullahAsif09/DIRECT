const mongoose = require("mongoose");
const dotenv = require("dotenv");
const NODE_ENV = process.env.NODE_ENV || "production";
console.log({ NODE_ENV });

dotenv.config({ path: `.env.${NODE_ENV}` });

// Set the strictQuery option to prepare for Mongoose 7
mongoose.set("strictQuery", false); // or mongoose.set('strictQuery', true);

// Get the database URL from environment variables
const db_url = process.env.DATABASE_URL;

mongoose
  .connect(db_url, { useNewUrlParser: true, useUnifiedTopology: true })
  .then(() => {
    console.log("Database Connected Successfully");
  })
  .catch((error) => {
    console.error("Error: " + error.message);
  });

// Export the mongoose connection to be used in other parts of the application
module.exports = mongoose;
