import { Link } from "react-router-dom";

const NavBar = () => {
  return (
    <nav className="navbar navbar-expand-lg navbar-light bg-light">
      <div className="collapse navbar-collapse" id="navbarNav">
        <ul className="navbar-nav">
          <li className="nav-item active">
            <Link className="nav-link" to="/dashboard">
              Home <span className="sr-only"></span>
            </Link>
          </li>
          <li className="nav-item active">
            <Link className="nav-link" to="/projects">
              Projects <span className="sr-only"></span>
            </Link>
          </li>
          <li className="nav-item active">
            <Link className="nav-link" to="/tasks">
              Tasks <span className="sr-only"></span>
            </Link>
          </li>
          <li className="nav-item active">
            <Link className="nav-link" to="/teams">
              Teams <span className="sr-only"></span>
            </Link>
          </li>
          <li className="nav-item active">
            <Link className="nav-link" to="/timeentries">
              Time Entries <span className="sr-only"></span>
            </Link>
          </li>
        </ul>
      </div>
    </nav>
  );
};

export default NavBar;
/*
<nav className="navbar">
      <ul className="nav-list">
        <li className="nav-item">
          <NavLink exact to="/dashboard" activeClassName="active-link">
            Home
          </NavLink>
        </li>
        <li className="nav-item">
          <NavLink to="/projects" activeClassName="active-link">
            Projects
          </NavLink>
        </li>
        <li className="nav-item">
          <NavLink to="/tasks" activeClassName="active-link">
            Tasks
          </NavLink>
        </li>
        <li className="nav-item">
          <NavLink to="/teams" activeClassName="active-link">
            Teams
          </NavLink>
        </li>
        <li className="nav-item">
          <NavLink to="/timeentries" activeClassName="active-link">
            Time Entries
          </NavLink>
        </li>
      </ul>
    </nav>
* */
