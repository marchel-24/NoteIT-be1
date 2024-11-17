const { sendNotes, getNotes, createNote, updateNote, deleteNote } = require("../controllers/note");
const asyncWrapper = require("../utils/wrapper");

module.exports = (router) => {
  router.get("/note", asyncWrapper(getNotes));

  router.post("/note/create", asyncWrapper(createNote));

  router.put("/note/:id", asyncWrapper(updateNote));

  router.delete("/note/:id", asyncWrapper(deleteNote));
};
