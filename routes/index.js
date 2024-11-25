const note = require("./note");
const task = require("./task");
const auth = require("./auth");

const express = require("express");
const router = express.Router();

const makeMainRouter = () => {
  note(router);
  task(router);
  auth(router);

  return router;
};

module.exports = makeMainRouter;
