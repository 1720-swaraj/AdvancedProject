
import "../style/Dashboard.css";

const Dashboard = () => {
  return (
    <div className="dashboard-container">
      <header className="dashboard-header">
        <h1>Dashboard</h1>
      </header>
      <div className="dashboard-main">
        <aside className="dashboard-sidebar">
          <nav>
            <ul>
              <li><a href="/dashboard">Home</a></li>
              <li><a href="/projects">Projects</a></li>
              <li><a href="/tasks">Tasks</a></li>
              <li><a href="/teams">Teams</a></li>
              <li><a href="/timeentries">Time Entries</a></li>
            </ul>
          </nav>
        </aside>
        <section className="dashboard-content">
          <div id="overview">
            <h2>Overview</h2>
            <p>The Collaborative Project Management Tool is designed to help teams manage projects effectively. It allows users to create and manage projects, assign team members, and track project progress. The tool includes authentication features to ensure that only authorized users can access and modify project data.</p>
          </div>
          <div id="tasks">
            <h2>Tasks</h2>
            <p>List of your tasks.</p>
          </div>
          <div id="projects">
            <h2>Projects</h2>
            <p>Details about your projects.</p>
          </div>
          <div id="teams">
            <h2>Teams</h2>
            <p>Information about your teams.</p>
          </div>
          <div id="settings">
            <h2>Time Entries</h2>
            <p>Manage your Time Entries.</p>
          </div>
        </section>
      </div>
    </div>
  );
};

export default Dashboard;
