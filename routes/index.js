const note = require("./note");

const express = require("express");
const router = express.Router();

const makeMainRouter = () => {
  note(router);
  return router;
};

module.exports = makeMainRouter;
