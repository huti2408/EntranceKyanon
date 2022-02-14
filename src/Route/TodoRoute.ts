import {Router} from "express"
import Authentication from "../Middleware/Authentication";
import TodoController from "../Controller/TodoController"

const router = Router();

router.get("/",Authentication,TodoController.GetAllTodos)
router.get("/detail/:id",Authentication,TodoController.GetTodoById)
router.get("/todobyuser/:id",Authentication,TodoController.GetTodosByUser)
router.post("/",Authentication,TodoController.AddTodo)
router.put("/:id",Authentication,TodoController.UpdateTodo)
router.delete("/:id",Authentication,TodoController.DeleteTodo)
router.post("/assign/:id",Authentication,TodoController.AssignTodo)

export default router