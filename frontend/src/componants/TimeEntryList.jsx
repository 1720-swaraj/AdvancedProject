
import axios from "axios";
import { useEffect, useState } from "react";
import "../style/TimeEntryList.css";

const TimeEntryList = () => {

  const [timeEntrys, setTimeEntrys] = useState([]);

  const NavigateToEnterTimes = async()=>{
    return window.location.href="/timeentry/new"
  }

  useEffect(() => {
    const fetchTimeEntries = async () => {
      try {
        const response = await axios.get("http://localhost:9999/api/timeEntries");
        setTimeEntrys(response.data.timeEntries);
      } catch (error) {
        console.log(error);
      }
    };
    fetchTimeEntries();
  }, []);

  return (
    <div className="time-entry-list-container">
      <h2 className="time-entry-list-title">Time Entry List</h2>
      <div className="time-entry-list">
        {timeEntrys.map((entry) => (
          <div key={entry._id} className="time-entry-item">
            <h4 className="time-entry-task">{entry.task.title}</h4>
            <p className="time-entry-user">User: {entry.user.name}</p>
            <p className="time-entry-timespent">Time Spent: {entry.timespent}</p>
            <p className="time-entry-date">Date: {entry.date}</p>
          </div>
        ))}
        <div className="time-list-footer">
        <button onClick={NavigateToEnterTimes} className="add-time-button">
          Add Time Entry
        </button>
      </div>
      </div>
    </div>
  );
};

export default TimeEntryList;
