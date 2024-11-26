const {
  createTask,
  getTasks,
  getTaskById,
  updateTask,
  deleteTask,
  sortTaskbydateasc,
  sortTaskByDateDesc,
} = require("../controllers/task");
const { verifyUser } = require("../middlewares/auth");

const asyncWrapper = require("../utils/wrapper");

module.exports = (router) => {
  router.post("/task", verifyUser, asyncWrapper(createTask));
  router.get("/task", verifyUser, asyncWrapper(getTasks));
  router.get("/task/:id", verifyUser, asyncWrapper(getTaskById));
  router.patch("/task/:id", verifyUser, asyncWrapper(updateTask));
  router.delete("/task/:id", verifyUser, asyncWrapper(deleteTask));
  router.get(
    "/task/sortbydateasc",
    verifyUser,
    asyncWrapper(sortTaskbydateasc)
  );
  router.get(
    "/task/sortdescbydate",
    verifyUser,
    asyncWrapper(sortTaskByDateDesc)
  );
};
