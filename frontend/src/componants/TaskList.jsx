import axios from "axios";
import { useEffect, useState } from "react";

const TaskList = () => {
  const [tasksdata, setTasksData] = useState([]);

  const NavigateToTaskForm = () => {
    window.location.href = "/task/new";
  };

  try {
    useEffect(() => {
      const fetchAllTasks = async () => {
        const response = await axios.get("http://localhost:9999/api/task");
        setTasksData(response.data.tasks);
      };
      fetchAllTasks();
    }, []);
  } catch (error) {
    console.log(error);
  }
  return (
    <>
      <div>
        {tasksdata.map((task) => (
          <ul key={task._id}>
            <li key={task._id}>{task.title}</li>
          </ul>
        ))}
      </div>
      <div>
        <button onClick={NavigateToTaskForm}>Add Task</button>
      </div>
    </>
  );
};

export default TaskList;
