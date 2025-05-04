// eventEmitter.js
const EventEmitter = require("events");
const eventEmitter = new EventEmitter();
eventEmitter.setMaxListeners(200);
module.exports = eventEmitter;
