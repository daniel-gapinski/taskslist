import { useContext } from "react";
import { TasksContext } from "../contexts/TasksContext";

export default function TasksStatistics() {

    const { countCompletedTasks, countTasksCreated } = useContext(TasksContext);

    return (
        <>
            <div className="mt-16 px-3 flex flex-row justify-between items-center text-gray-530 text-sm font-semibold">
                <div className="flex flex-row items-center gap-2 justify-center">
                    <p>Tarefas criadas</p>
                    <small className="bg-purple-light text-purple-dark rounded-full p-1 w-5 h-5 flex items-center justify-center">{countTasksCreated}</small>
                </div>
                <div className="flex flex-row items-center gap-2 justify-center">
                    <p>Finalizadas</p>
                    <small className="bg-green-light text-green-dark rounded-full p-1 w-5 h-5 flex items-center justify-center">{countCompletedTasks}</small>
                </div>
            </div>
        </>
    )
}