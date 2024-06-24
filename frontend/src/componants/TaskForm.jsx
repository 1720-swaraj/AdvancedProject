import axios from "axios";
import { useEffect, useState } from "react";
import "../style/TaskForm.css"; // Importing the CSS file

const TaskForm = () => {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [project, setProject] = useState("");
  const [assignee, setAssignee] = useState("");
  const [projectManagers, setProjectManager] = useState([]);
  const [projects, setProjects] = useState([]);

  useEffect(() => {
    const fetchProjectManager = async () => {
      const response = await axios.get("http://localhost:9999/api/users");
      setProjectManager(response.data.users);
      const projectResponse = await axios.get(
        "http://localhost:9999/api/project"
      );
      setProjects(projectResponse.data.projects);
    };
    fetchProjectManager();
  }, []);

  const handleProjectChecked = (projectId) => {
    setProject(projectId);
  };

  const handleProjectManagers = (managerId) => {
    setAssignee(managerId);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const payload = { title, description, project, assignee };
    const response = await axios.post(
      "http://localhost:9999/api/task",
      payload
    );
    console.log(response);
    window.location.href = "/tasks";
  };

  return (
    <div className="task-form-container">
      <h2 className="task-form-title">Create New Task</h2>
      <form onSubmit={handleSubmit} className="task-form">
        {projects.length === 0 ? (
          <h3 className="no-projects-message">Add Projects First</h3>
        ) : (
          <>
            <div className="input-group">
              <label htmlFor="title">Title:</label>
              <input
                type="text"
                id="title"
                value={title}
                placeholder="Title"
                onChange={(e) => setTitle(e.target.value)}
                required
              />
            </div>
            <div className="input-group">
              <label htmlFor="description">Description:</label>
              <input
                type="text"
                id="description"
                value={description}
                placeholder="Description"
                onChange={(e) => setDescription(e.target.value)}
                required
              />
            </div>
            <div className="input-group">
              <label>Project:</label>
              <div className="checkbox-group">
                {projects.map((proj) => (
                  <div key={proj._id} className="checkbox-item">
                    <input
                      type="checkbox"
                      id={proj._id}
                      value={proj._id}
                      checked={project === proj._id}
                      onChange={() => handleProjectChecked(proj._id)}
                    />
                    <label htmlFor={proj._id}>{proj.projectName}</label>
                  </div>
                ))}
              </div>
            </div>
            <div className="input-group">
              <label>Assignee:</label>
              <div className="checkbox-group">
                {projectManagers
                  .filter((manage) => manage.role === "Project Manager")
                  .map((manage) => (
                    <div key={manage._id} className="checkbox-item">
                      <input
                        type="checkbox"
                        id={manage._id}
                        value={manage._id}
                        checked={assignee === manage._id}
                        onChange={() => handleProjectManagers(manage._id)}
                      />
                      <label htmlFor={manage._id}>{manage.name}</label>
                    </div>
                  ))}
              </div>
            </div>
            <button type="submit" className="submit-button">
              Create Task
            </button>
          </>
        )}
      </form>
    </div>
  );
};

export default TaskForm;
