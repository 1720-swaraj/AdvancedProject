

import axios from "axios";
import { useEffect, useState } from "react";
import "../style/TaskList.css"; // Importing the CSS file

const TaskList = () => {
  const [tasksdata, setTasksData] = useState([]);
  const NavigateToTaskForm = () => {
    window.location.href = "/task/new";
  };

  const deleteTask = async (id) => {
    try {
      const response = await axios.delete(
        `http://localhost:9999/api/task/delete/${id}`
      );
      setTasksData(tasksdata.filter((delId) => delId._id !== id));
      console.log(response);
    } catch (error) {
      console.log(error);
    }
  };
  useEffect(() => {
    const fetchAllTasks = async () => {
      try {
        const response = await axios.get("http://localhost:9999/api/task");
        setTasksData(response.data.tasks);
      } catch (error) {
        console.log(error);
      }
    };

    fetchAllTasks();
  }, []);

  return (
    <div className="task-list-container">
      <h2 className="task-list-title">Task List</h2>
      <div className="task-list">
        {tasksdata.map((task) => (
          <div key={task._id} className="task-item">
            <h3>{task.title}</h3>
            <p>{task.description}</p>
            <p className="paregraph">Assigned By : {task.assignee.name}</p>
            <p className="paregraph">Project Name : {task.project.projectName}</p>
            <button className="btn-delete" onClick={() => deleteTask(task._id)}>
              Done
            </button>
          </div>
        ))}
      </div>
      <div className="task-list-footer">
        <button onClick={NavigateToTaskForm} className="add-task-button">
          Add Task
        </button>
      </div>
    </div>
  );
};

export default TaskList;
