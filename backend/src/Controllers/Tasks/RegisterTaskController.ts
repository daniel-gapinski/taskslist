import { RegisterTaskService } from "../../Services/Tasks/RegisterTaskService"
import { Request, Response } from "express";

class RegisterTaskController {

    async handle(req: Request, res: Response) {

        const { content } = req.body;
        const user_id = req.user_id;

        const registerTask = new RegisterTaskService();

        const task = await registerTask.execute({
            content,
            user_id,
        });

        return res.json(task);
    }
}

export { RegisterTaskController }