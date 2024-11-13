const { sendNotes } = require("../controllers/note");

module.exports = (router) => {
  router.get("/note", sendNotes);
};
