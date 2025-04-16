import CreateTaskButton from "../components/CreateTaskButton";
import Container from "../components/Container";
import Header from "../components/Heeader";
import Input from "../components/Input";
import Justify from "../components/Justify";
import Task from "../components/Task";
import TasksStatistics from "../components/TasksStatistics";
import { useState } from "react";
import { useContext } from "react";
import { TasksContext } from "../contexts/TasksContext";

export default function Home() {

  const { createTask } = useContext(TasksContext);

  function handleTask(newTask: string) {
    createTask(newTask);
  };

  const [newTask, setNewTask] = useState("");

  return (
    <>
      <Header />

      <Container>
        <Justify>
          <Input 
            name="newTask" 
            placeholder="Adicione uma nova tarefa" 
            type="text" 
            value={newTask}
            onChange={(e) => setNewTask(e.target.value)}
          />
          
          <CreateTaskButton 
            onClick={() => {
              handleTask(newTask);
              setNewTask("");
            }}
          >
              Criar
          </CreateTaskButton>
        </Justify>
      </Container>

      <Container>
        <TasksStatistics />
      </Container>

      <Container>
        <Task />
      </Container>
    </>
  )
}