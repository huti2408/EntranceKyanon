import {Router} from "express"
import Authentication from "../Middleware/Authentication";
import TodoController from "../Controller/TodoController"

const router = Router();

router.get("/",TodoController.GetAllTodos)
router.get("/detail/:id",TodoController.GetTodoById)
router.get("/todobyuser/:id",TodoController.GetTodosByUser)
router.post("/",TodoController.AddTodo)
router.put("/:id",TodoController.UpdateTodo)
router.delete("/:id",TodoController.DeleteTodo)
router.post("/assign",TodoController.AssignTodo)

export default router