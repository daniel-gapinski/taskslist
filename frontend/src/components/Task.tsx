import Checkbox from '@mui/material/Checkbox';
import DeleteButton from './DeleteButton';
import { useContext } from 'react';
import { TasksContext } from '../contexts/TasksContext';
import TaskNotFound from './TaskNotFound';

export default function Task() {

    const { tasks, deleteTask, toggleChecked } = useContext(TasksContext);

    return (
        <>
            {tasks.length === 0 && <TaskNotFound />}
            {tasks.map((task) => {

                return (

                    <div
                        key={task.id}
                        className={`w-full mt-4 px-3 min-h-18 rounded-lg p-2 flex flex-row justify-between items-center border-2 border-gray-330 gap-3 sm:gap-1 ${task.checked ? "bg-white" : "bg-gray-330"}`}
                    >
                        <div className="flex items-center gap-2">
                            <Checkbox
                                size="small"
                                color="success"
                                checked={task.checked ?? false}
                                onChange={() => toggleChecked({ id: task.id, currentChecked: task.checked })}

                            />

                            <p className={`text-sm ${task.checked ? "line-through text-gray-500" : "text-gray-630"}`}>
                                {task.content}
                            </p>
                        </div>

                        <DeleteButton onClick={() => deleteTask(task.id)} />
                    </div>
                );
            })}
        </>
    );
}
