import prismaClient from "../../prisma";

class ListTasksService {

    async execute(user_id : string) {

        const listTask = await prismaClient.task.findMany({
            where: {
                user_id: user_id,
            },
            select: {
                id: true,
                content: true,
                user_id: true,
                checked: true,
            },
            orderBy: {
                created_at: "desc",
            }
        });

        const countTasksCreated = await prismaClient.task.count({
            where: {
                user_id: user_id,
            },
        });
        const countCompletedTasks = await prismaClient.task.count({
            where: {
                user_id: user_id,
                checked: true,
            },
        });

        return { listTask, countTasksCreated, countCompletedTasks };
        
    }
}

export { ListTasksService }