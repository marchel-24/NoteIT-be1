const {
  createTask,
  getTasks,
  getTaskById,
  updateTask,
  deleteTask,
  sortTaskbydateasc,
} = require("../controllers/task");

const asyncWrapper = require("../utils/wrapper");

module.exports = (router) => {
  router.post("/tasks/create", asyncWrapper(createTask));        
  router.get("/tasks", asyncWrapper(getTasks));           
  router.get("/tasks/:id", asyncWrapper(getTaskById));
  router.put("/tasks/:id", asyncWrapper(updateTask));     
  router.delete("/tasks/:id", asyncWrapper(deleteTask));  
  router.get("/task/sortbydateasc",asyncWrapper(sortTaskbydateasc))
};
