const {
  sendNotes,
  getNotes,
  createNote,
  updateNote,
  deleteNote,
} = require("../controllers/note");
const { verifyUser } = require("../middlewares/auth");
const asyncWrapper = require("../utils/wrapper");

module.exports = (router) => {
  router.get("/note", verifyUser, asyncWrapper(getNotes));

  router.post("/note", verifyUser, asyncWrapper(createNote));

  router.patch("/note/:id", verifyUser, asyncWrapper(updateNote));

  router.delete("/note/:id", verifyUser, asyncWrapper(deleteNote));
};
