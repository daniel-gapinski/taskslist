import prismaClient from "../../prisma";

interface DeleteTaskRequest {
    id: string;
    user_id: string;
}

class DeleteTaskService {

    async execute({ id, user_id }: DeleteTaskRequest) {

        try {
            if (id === "" || user_id === "") {
                throw new Error("A task não existe!");

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

            const deleteTask = await prismaClient.task.delete({
                where: {
                    id: id,
                },
            });

            return { message: "Deletado com sucesso! "}

        } catch (err) {
            console.log("Erro ao deletar: ", err);

        }
    }
}

export { DeleteTaskService }