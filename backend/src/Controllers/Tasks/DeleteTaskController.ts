import { DeleteTaskService } from "../../Services/Tasks/DeleteTaskService";
import { Request, Response } from "express";

class DeleteTaskController {

    async handle(req: Request, res: Response) {

        const user_id = req.user_id;
        const id = req.query.id as string;

        const deleteTask = new DeleteTaskService();

        const task = await deleteTask.execute({
            user_id,
            id,
        });

        return res.json(task);
    }
}

export { DeleteTaskController }