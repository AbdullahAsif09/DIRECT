// server.js
require("./db/connect.js");
const express = require("express");
const http = require("http");

// Import setups
const { WatchStreams } = require("./WatchStreams");
const appGlobalMiddlewares = require("./middlewares/appGlobalMiddlares");
const routesSetup = require("./routes");
const socketSetup = require("./sockets/setup");
// require("./controllers/test.js");
const app = express();
const serverSockets = http.createServer(app);

// Apply global middlewares
appGlobalMiddlewares(app);

// Load all routes
routesSetup(app);

// Start the server
const port = process.env.PORT || 3000;

serverSockets.listen(port, () => {
  console.log(`Server listening at ${port}`);

  // Setup sockets
  socketSetup(serverSockets);

  // Start streams watcher
  WatchStreams();
});
