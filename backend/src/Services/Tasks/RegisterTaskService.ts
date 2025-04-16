import prismaClient from "../../prisma";

interface TaskRequest {
    content: string;
    user_id: string;
}

class RegisterTaskService {

    async execute({ content, user_id }: TaskRequest) {

        if(content === "") {
            throw new Error("Preencha o conteúdo!");
        }

        const newTask = await prismaClient.task.create({
            data: {
                content: content,
                user_id: user_id,
            },
        })

        return newTask;
        
    }
}

export { RegisterTaskService }