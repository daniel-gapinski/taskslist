import { createContext, ReactNode, useContext, useEffect, useState } from "react";
import { api } from "../services/apiClient";
import { AuthContext } from "./AuthContext";
import { toast } from "react-toastify";

interface TasksContextData {
    tasks: TaskType[];
    createTask: (newTask: string) => void;
    deleteTask: (id: number) => void;
    toggleChecked: (credentials: toggleCheckedProps) => void;
    countTasksCreated: number;
    countCompletedTasks: number;
}

interface toggleCheckedProps {
    id: number;
    currentChecked: boolean;
}

type TaskProviderProps = {
    children: ReactNode;
}

type TaskType = {
    id: number;
    content: string;
    checked: boolean;
};

export const TasksContext = createContext({} as TasksContextData);

export function TaskProvider({ children }: TaskProviderProps) {

    const [tasks, setTasks] = useState<TaskType[]>([]);
    const [countTasksCreated, setCountTasksCreated] = useState(0);
    const [countCompletedTasks, setCountCompletedTasks] = useState(0);
    const { isAuthenticated, loading } = useContext(AuthContext);

    useEffect(() => {
        async function loadTasks() {
            try {
                const response = await api.get("/tasks");
                
                setTasks(response.data.listTask);
                setCountTasksCreated(response.data.countTasksCreated);
                setCountCompletedTasks(response.data.countCompletedTasks);

            } catch (err) {
                console.log("Erro ao buscar tasks, ", err);
            }
        }

        if (!loading && isAuthenticated) {
            loadTasks();
        }
    }, []);


    async function createTask(newTask: string) {
        if (newTask.trim() === "") {
            toast.warn("O campo não pode ficar vazio!");
            return;
        }
        try {
            const response = await api.post("/task", {
                content: newTask,
            });
            setTasks(prev => [response.data, ...prev]);

        } catch (err) {
            console.log("Erro ao criar nova task ", err);
        }
    }

    async function deleteTask(id: number) {
        try {
            await api.delete(`/task?id=${id}`);
            setTasks(prev => prev.filter(task => task.id !== id));
            toast.success("Tarefa deletada com sucesso!")

        } catch (err) {
            console.log("Erro ao deletar task ", err);
        }

    }

    async function toggleChecked({ id, currentChecked }: toggleCheckedProps) {

        const newChecked = !currentChecked;

        await api.put(`/task?id=${id}`, {
            checked: newChecked,
        });

        setTasks(prev => prev.map(task =>
            task.id === id ? { ...task, checked: newChecked } : task
        ));

    }

    useEffect(() => {
        setCountTasksCreated(tasks.length);
        setCountCompletedTasks(tasks.filter(task => task.checked).length);
    }, [tasks]);

    return (
        <TasksContext.Provider value={{
            createTask,
            deleteTask,
            toggleChecked,
            countTasksCreated,
            countCompletedTasks,
            tasks,
        }}>
            {children}
        </TasksContext.Provider>
    )

}