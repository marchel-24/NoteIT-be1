const { sendNotes, getNotes } = require("../controllers/note");
const asyncWrapper = require("../utils/wrapper");

module.exports = (router) => {
  router.get("/note", asyncWrapper(getNotes));
};
