import prismaClient from "../../prisma";

interface UpdateTaskRequest {
    id: string;
    user_id: string;
    checked: boolean;
}

class UpdateTaskService {

    async execute({ id, user_id, checked }: UpdateTaskRequest) {

        const newDate = new Date();

        if (!id || !user_id) {
            throw new Error("ID da tarefa/usuário não informado!");
        }

        const taskExists = await prismaClient.task.findFirst({
            where: {
                id: id,
                user_id: user_id,
            },
        });

        if (!taskExists) {
            throw new Error("Não autorizado!");
        }

        const updateTask = await prismaClient.task.update({
            where: {
                id: id,
            },
            data: {
                checked: checked,
                updated_at: newDate,
            }
        });

        return updateTask;
    }
}

export { UpdateTaskService }