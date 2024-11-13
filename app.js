// Importing supporting packages
const morgan = require("morgan");
const helmet = require("helmet");

// Implementing supporting packages
const express = require("express");
const app = express();
app.use(express.json());
app.use(morgan("dev"));
app.use(helmet());

// Connecting the database
const connectDB = require("./config/database");
connectDB(process.env.MONGO_URI);

// Implementing the main router
const makeMainRouter = require("./routes");
const mainRouter = makeMainRouter();

app.use("/", mainRouter);

module.exports = app;
