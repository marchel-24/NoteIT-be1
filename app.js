const morgan = require("morgan");
const helmet = require("helmet");

const express = require("express");
const app = express();
app.use(express.json());
app.use(morgan("dev"));
app.use(helmet());

const makeMainRouter = require("./routes");
const mainRouter = makeMainRouter();

app.use("/", mainRouter);

module.exports = app;
