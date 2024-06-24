import { BrowserRouter as Router, Route, Routes } from "react-router-dom";

import ProjectList from "./componants/ProjectList.jsx";
import ProjectForm from "./componants/ProjectForm.jsx";
import TaskList from "./componants/TaskList.jsx";
import TaskForm from "./componants/TaskForm.jsx";
import TeamList from "./componants/TeamList.jsx";
import TeamForm from "./componants/TeamForm.jsx";
import TimeEntryList from "./componants/TimeEntryList.jsx";
import TimeEntryForm from "./componants/TimeEntryForm.jsx";
import Dashbord from "./componants/Dashbord.jsx";
import NavBar from "./componants/NavBar.jsx";
import "../node_modules/bootstrap/dist/css/bootstrap.min.css";
import Login from "./componants/Login.jsx";
import Register from "./componants/Register.jsx";

const App = () => {
  return (
    <>
      <Router>
        <div>
          <NavBar />
          <div className="container">
            <Routes>
              <Route path="/dashbord" element={<Dashbord />} />
              <Route path="/" element={<Login />} />
              <Route path="/login" element={<Login />} />
              <Route path="/register" element={<Register />} />
              <Route path="/projects" element={<ProjectList />} />
              <Route path="/project/new" element={<ProjectForm />} />
              <Route path="/tasks" element={<TaskList />} />
              <Route path="/task/new" element={<TaskForm />} />
              <Route path="/teams" element={<TeamList />} />
              <Route path="/team/new" element={<TeamForm />} />
              <Route path="/timeentries" element={<TimeEntryList />} />
              <Route path="/timeentry/new" element={<TimeEntryForm />} />
            </Routes>
          </div>
        </div>
      </Router>
    </>
  );
};
export default App;
