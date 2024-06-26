import axios from "axios";
import { useEffect, useState } from "react";
import "../style/TeamForm.css";

const TeamForm = () => {
  const [teamName, setTeamName] = useState("");
  const [members, setMembers] = useState([]);
  const [teamMembers, setTeamMembers] = useState([]);

  useEffect(() => {
    const fetchTeamMembers = async () => {
      try {
        const response = await axios.get("http://localhost:9999/api/users");
        setTeamMembers(response.data.users);
      } catch (error) {
        console.log(error);
      }
    };
    fetchTeamMembers();
  }, []);

 

  const addMembers = (userId) => {
    const updatedMembers = members.includes(userId)
      ? members.filter((id) => id !== userId)
      : [...members, userId];
    setMembers(updatedMembers);
  };

  const createTeamMembers = async (e) => {
    e.preventDefault();
    const payload = { teamName, members };
    try {
      const response = await axios.post(
        "http://localhost:9999/api/team",
        payload
      );
      console.log(response);
      window.location.href = "/teams";
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div className="team-form-container">
      <h2>Create a New Team</h2>
      <form onSubmit={createTeamMembers} className="team-form">
        <div className="input-group">
          <label htmlFor="teamName">Team Name</label>
          <input
            type="text"
            id="teamName"
            value={teamName}
            onChange={(e) => setTeamName(e.target.value)}
            placeholder="Enter team name"
            required
          />
        </div>
        <div className="input-group">
          <label>Team Members</label>
          <div className="members-list">
            {teamMembers.map((user) => (
              <div key={user._id} className="member-item">
                <input
                  type="checkbox"
                  id={user._id}
                  value={user._id}
                  checked={members.includes(user._id)}
                  onChange={() => addMembers(user._id)}
                />
                <label className="labels"htmlFor={user._id}>{user.name}</label>
              </div>
            ))}
          </div>
        </div>
        <button type="submit" className="submit-button">Create Team</button>
      </form>
    </div>
  );
};

export default TeamForm;
