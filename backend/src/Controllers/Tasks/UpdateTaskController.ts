import { Request, Response } from "express";
import { UpdateTaskService } from "../../Services/Tasks/UpdateTaskService";

class UpdateTaskController {

    async handle(req: Request, res: Response) {

        const user_id = req.user_id;
        const id = req.query.id as string;
        const { checked } = req.body;

        const updateTask = new UpdateTaskService();

        const task = await updateTask.execute({
            user_id,
            id,
            checked,
        });

        return res.json(task);

    }
}

export { UpdateTaskController }