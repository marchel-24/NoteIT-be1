const {
  createTask,
  getTasks,
  getTaskById,
  updateTask,
  deleteTask,
  sortTaskbydateasc,
  sortTaskByDateDesc,
} = require("../controllers/task");

const asyncWrapper = require("../utils/wrapper");

module.exports = (router) => {
  router.post("/task", asyncWrapper(createTask));
  router.get("/task", asyncWrapper(getTasks));
  router.get("/task/:id", asyncWrapper(getTaskById));
  router.patch("/task/:id", asyncWrapper(updateTask));
  router.delete("/task/:id", asyncWrapper(deleteTask));
  router.get("/task/sortbydateasc", asyncWrapper(sortTaskbydateasc));
  router.get("/task/sortdescbydate", asyncWrapper(sortTaskByDateDesc));
};
