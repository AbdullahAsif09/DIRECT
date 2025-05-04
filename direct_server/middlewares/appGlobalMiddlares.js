const helmet = require("helmet");
const cors = require("cors");
const compression = require("compression");
const express = require("express");
const cookieParser = require("cookie-parser");
const { allowedOrigins } = require("../constants/origins.js");
const { getClientIp } = require("../helper/getIp/index.js");
const rateLimit = require("express-rate-limit");

const appGlobalMiddlewares = (app) => {
  // Security headers with customized Helmet configuration
  app.use(
    helmet({
      crossOriginResourcePolicy: {
        policy: "cross-origin",
      } /* for resource access from different origin */,
    })
  );

  // CORS Middleware
  app.use(
    cors({
      origin: (origin, callback) => {
        if (!origin || allowedOrigins.includes(origin)) {
          callback(null, true);
        } else {
          callback(null, false); // Explicitly deny access
        }
      },
      credentials: true,
    })
  );

  // Rate Limiter Middleware
  app.use(
    rateLimit({
      windowMs: 1 * 60 * 1000, // 1 minute
      max: 100, // Limit each IP to 150 requests per windowMs
      standardHeaders: true,
      legacyHeaders: false,
      handler: (req, res) => {
        return res
          .status(429)
          .json({ error: "Too many requests, please try again later." });
      },
    })
  );

  // Compression Middleware
  app.use(compression());

  app.use(express.json({ limit: "20mb" })); // or your desired limit
  app.use(express.urlencoded({ extended: true, limit: "20mb" })); // or your desired limit

  // Cookie Parser Middleware
  app.use(cookieParser());

  // Custom Middleware for Request Logging and Handling Undefined URLs
  app.use((req, res, next) => {
    getClientIp(req);
    if (req.originalUrl === "/undefined") {
      return res.status(400).json("Invalid request URL");
    }

    if (req.originalUrl.startsWith("/api")) {
      console.log(`api(${req.method}): ${req.originalUrl}`);
    }
    next();
  });
};

module.exports = appGlobalMiddlewares;
