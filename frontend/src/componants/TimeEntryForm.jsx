
import { useEffect, useState } from "react";
import axios from "axios";
import "../style/TimeEntryForm.css";

const TimeEntryForm = () => {

  const [task, setTask] = useState("");
  const [user, setUser] = useState("");
  const [timespent, setTimeSpent] = useState("");
  const [date, setDate] = useState("");
  const [users, setUsers] = useState([]);
  const [tasks, setTasks] = useState([]);

  useEffect(() => {
    const fetchUserAndTasks = async () => {
      try {
        const userResponse = await axios.get("http://localhost:9999/api/users");
        setUsers(userResponse.data.users);
        const taskResponse = await axios.get("http://localhost:9999/api/task");
        setTasks(taskResponse.data.tasks);
      } catch (error) {
        console.log(error);
      }
    };
    fetchUserAndTasks();
  }, []);

  const addTimeEntrys = async (e) => {
    e.preventDefault();
    const payload = { task, user, timespent, date };
    try {
      const addTimeEntry = await axios.post(
        "http://localhost:9999/api/timeEntries",
        payload
      );
      console.log(addTimeEntry);
      window.location.href = "/timeentries";
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div className="time-entry-form-container">
      <h2 className="form-title">Add Time Entry</h2>
      <form onSubmit={addTimeEntrys} className="time-entry-form">
        <div className="form-group">
          <label htmlFor="task">Task</label>
          <select
            id="task"
            value={task}
            onChange={(e) => setTask(e.target.value)}
            required
          >
            <option value="">Select Task</option>
            {tasks.map((taskval) => (
              <option key={taskval._id} value={taskval._id}>
                {taskval.title}
              </option>
            ))}
          </select>
        </div>
        <div className="form-group">
          <label htmlFor="user">User</label>
          <select
            id="user"
            value={user}
            onChange={(e) => setUser(e.target.value)}
            required
          >
            <option value="">Select User</option>
            {users.map((userval) => (
              <option key={userval._id} value={userval._id}>
                {userval.name}
              </option>
            ))}
          </select>
        </div>
        <div className="form-group">
          <label htmlFor="timespent">Time Spent (hours)</label>
          <input
            id="timespent"
            type="number"
            value={timespent}
            placeholder="Enter Time In hours"
            onChange={(e) => setTimeSpent(e.target.value)}
            required
          />
        </div>
        <div className="form-group">
          <label htmlFor="date">Date</label>
          <input
            id="date"
            type="date"
            value={date}
            onChange={(e) => setDate(e.target.value)}
            required
          />
        </div>
        <button type="submit" className="submit-button">Add Time Entry</button>
      </form>
    </div>
  );
};

export default TimeEntryForm;
