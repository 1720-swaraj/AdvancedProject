import { useEffect, useState } from "react";
import axios from "axios";
import "../style/ProjectForm.css";
const ProjectForm = () => {
  const [projectName, setProjectName] = useState("");
  const [description, setDescription] = useState("");
  const [manager, setManager] = useState("");
  const [team, setTeam] = useState([]);
  const [users, setUsers] = useState([]);

  useEffect(() => {
    const fetchUserData = async () => {
      try {
        const response = await axios.get("http://localhost:9999/api/users");
        setUsers(response.data.users);
      } catch (error) {
        console.log(error);
      }
    };
    fetchUserData();
  }, []);

  const handleManagerChange = (userId) => {
    setManager(userId);
  };

  const handleTeamChange = (userId) => {
    const updatedTeam = team.includes(userId)
      ? team.filter((id) => id !== userId)
      : [...team, userId];
    setTeam(updatedTeam);
  };
  const createProjectHandler = async () => {
    try {
      const payload = { projectName, description, manager, team };
      const response = await axios.post(
        "http://localhost:9999/api/project",
        payload
      );
      console.log(response);
      window.location.href = "/projects";
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <center>
      <div className="project-form-container">
        <h2>Create Project</h2>
        <form onSubmit={createProjectHandler} className="project-form">
          <div className="input-group">
            <label>Project Name</label>
            <input
              type="text"
              value={projectName}
              onChange={(e) => setProjectName(e.target.value)}
              className="project-input"
              required
            />
          </div>
          <div className="input-group">
            <label>Description</label>
            <input
              type="textarea"
              name="description"
              id="description"
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              className="project-input"
              required
            />
          </div>
          <div className="input-group">
            <center>
              <label className="label">Manager</label>
              <hr className="hr-tag" />
            </center>
            <div className="role-group">
              {users
                .filter((user) => user.role === "Project Manager")
                .map((user) => (
                  <div key={user._id}>
                    <input
                      type="checkbox"
                      id={user._id}
                      value={user._id}
                      checked={manager === user._id}
                      onChange={() => handleManagerChange(user._id)}
                      className="project-checkbox"
                    />
                    <label className="label" htmlFor={user._id}>
                      {user.name}
                    </label>
                  </div>
                ))}
            </div>
          </div>
          <div className="input-group">
            <center>
              <label className="label">Select Team Members</label>
              <hr className="hr-tag" />
            </center>
            <div className="role-group">
              {users.map((user) => (
                <div key={user._id}>
                  <input
                    type="checkbox"
                    id={user._id}
                    value={user._id}
                    checked={team.includes(user._id)}
                    onChange={() => handleTeamChange(user._id)}
                    className="project-checkbox"
                  />
                  <label className="label" htmlFor={user._id}>
                    {user.name}
                  </label>
                </div>
              ))}
            </div>
          </div>
          <button type="submit" className="project-button">
            Create Project
          </button>
        </form>
      </div>
    </center>
  );
};

export default ProjectForm;
