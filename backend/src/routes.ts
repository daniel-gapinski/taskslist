import { Router } from "express";
import { isAuthenticated } from "./middlewares/isAuthenticated";

import { RegisterUserController } from "./Controllers/Users/RegisterUserController";
import { AuthUserController } from "./Controllers/Users/AuthUserController";
import { UserDetailController } from "./Controllers/Users/UserDetailController";

import { RegisterTaskController } from "./Controllers/Tasks/RegisterTaskController";
import { ListTasksController } from "./Controllers/Tasks/ListTasksController";
import { DeleteTaskController } from "./Controllers/Tasks/DeleteTaskController";
import { UpdateTaskController } from "./Controllers/Tasks/UpdateTaskController";

const router = Router();

// User Routes
router.post("/users", new RegisterUserController().handle);
router.post("/session", new AuthUserController().handle);
router.get("/me", isAuthenticated, new UserDetailController().handle);

// Tasks Routes
router.post("/task", isAuthenticated, new RegisterTaskController().handle);
router.get("/tasks", isAuthenticated, new ListTasksController().handle);
router.delete("/task", isAuthenticated, new DeleteTaskController().handle);
router.put("/task", isAuthenticated, new UpdateTaskController().handle);

export { router };