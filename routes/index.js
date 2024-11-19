const note = require("./note");
const task = require("./task");

const express = require("express");
const router = express.Router();

const makeMainRouter = () => {
  note(router);
  task(router);
  return router;
};

module.exports = makeMainRouter;
