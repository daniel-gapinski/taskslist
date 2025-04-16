import { Request, Response } from "express";
import { ListTasksService } from "../../Services/Tasks/ListTasksService";

class ListTasksController {

    async handle(req: Request, res: Response) {

        const user_id = req.user_id;

        const listTasks = new ListTasksService();
        
        const tasks = await listTasks.execute(user_id);

        return res.json(tasks);
    }
}

export { ListTasksController }