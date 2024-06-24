import axios from "axios";
import { useEffect, useState } from "react";
import "../style/ProjectList.css";

const NavigateToProjectForm = () => {
  window.location.href = "/project/new";
};

const ProjectList = () => {
  const [projectList, setProjectList] = useState([]);
  useEffect(() => {
    const fetchProjectList = async () => {
      const response = await axios.get("http://localhost:9999/api/project");
      console.log(response);
      setProjectList(response.data.projects);
    };
    fetchProjectList();
  }, []);
  const delProject = async (id) => {
    const deleteProjectById = await axios.delete(
      `http://localhost:9999/api/project/delete/${id}`
    );
    setProjectList(projectList.filter((project) => project._id !== id));
    console.log(deleteProjectById);
  };
  return (
    <center>
      <div className="project-list-container">
        <h2>Project List</h2>
        {projectList.length === 0 ? (
          <p>No projects found.</p>
        ) : (
          projectList.map((project) => (
            <div key={project._id} className="project-item">
              {/* <label className="label">Project Name:</label> */}
              <h3 className="project-name">{project.projectName}</h3>
              {/* <label className="label">Project Description:</label> */}
              <p className="project-description">{project.description}</p>
              <button
                className="btn-delete"
                onClick={() => delProject(project._id)}
              >
                Delete
              </button>
            </div>
          ))  
        )}
        <div>
          <button className="btn-add" onClick={NavigateToProjectForm}>
            Add Projects
          </button>
        </div>
      </div>
    </center>
  );
};
export default ProjectList;
