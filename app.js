const express = require("express");
const path = require("path");
const mongoose = require("mongoose");
const config = require("./utils/config");
const logger = require("./utils/logger");
const middleware = require("./utils/middleware");

const blogsRouter = require("./controllers/blog");
const usersRouter = require("./controllers/user");
const loginRouter = require("./controllers/login");

/* db */
const mongoUrl = config.MONGODB_URI;
mongoose.connect(mongoUrl, { family: 4 })
  .then(() => {
    logger.info(`MongoDB connected: ${mongoUrl}`);
  })
  .catch(err => {
    logger.error(err);
  });

/* app */
const app = express();

const frontendPath = path.join(__dirname, "frontend", "dist");
app.use(express.static(frontendPath)); // serve frontend

app.use(middleware.tokenExtractor);
app.use(express.json());
app.use("/api/blogs", middleware.userExtractor, blogsRouter);
app.use("/api/users", usersRouter);
app.use("/api/login", loginRouter);

app.use("/api", (_req, res) => {
  res.status(404).json({ error: "unknown endpoint" });
});

// catch frontend routes
app.use((_req, res) => {
  res.sendFile(path.join(__dirname, "frontend", "dist", "index.html"));
});

// routes for testing
if (process.env.NODE_ENV === "test") {
  const testRouter = require("./controllers/testing");
  app.use("/api/testing", testRouter);
}

app.use(middleware.unknownEndpoint);
app.use(middleware.errorHandler);

module.exports = app;
