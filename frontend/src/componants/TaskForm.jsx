import axios from "axios";
import { useEffect, useState } from "react";

const TaskForm = () => {
  //title,
  // description,
  // project,
  // assignee,
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

  const handelSubmit = async () => {
    const payload = { title, description, project, assignee };
    const response = await axios.post(
      "http://localhost:9999/api/task",
      payload
    );
    console.log(response);
    window.location.href = "/tasks";
  };

  return (
    <>
      <form onSubmit={handelSubmit}>
        <label>Title:-</label>
        <input
          type="text"
          value={title}
          placeholder="Title"
          onChange={(e) => setTitle(e.target.value)}
        />
        <label>Description:-</label>
        <input
          type="text"
          value={description}
          placeholder="Description"
          onChange={(e) => setDescription(e.target.value)}
        />
        <label>Project:-</label>
        {projects.map((proj) => (
          <div key={proj._id}>
            <input
              type="checkbox"
              id={proj._id}
              value={proj._id}
              key={proj._id}
              checked={project === proj._id}
              onChange={() => handleProjectChecked(proj._id)}
            />
            <label htmlFor={proj._id}>{proj.projectName}</label>
          </div>
        ))}
        <label>Assignee:-</label>
        {projectManagers
          .filter((manage) => manage.role === "Project Manager")
          .map((manage) => (
            <div key={manage._id}>
              <input
                type="checkbox"
                id={manage._id}
                key={manage._id}
                value={manage._id}
                checked={assignee === manage._id}
                onChange={() => handleProjectManagers(manage._id)}
              />
              <label htmlFor={manage._id}>{manage.name}</label>
            </div>
          ))}
        <button type="submit">
          Create Task
        </button>
      </form>
    </>
  );
};

export default TaskForm;
