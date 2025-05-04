// routes/index.js
const path = require("path");
const fs = require("fs");
const express = require("express");

module.exports = (app) => {
  const routesDirectory = path.join(__dirname);
  fs.readdirSync(routesDirectory).forEach((file) => {
    if (file !== "index.js") {
      const route = require(`./${file}`);
      const routeName = file.replace(".js", ""); // Assuming routes use their file names
      app.use(`/api/${routeName}`, route.routes || route); // Modify based on route structure
    }
  });

  app.use("/uploads", express.static("uploads"));
  app.use("/asset", express.static("asset"));
};
