import axios from "axios";
import { useEffect, useState } from "react";

const TeamForm = () => {
  const [teamName, setTeamName] = useState("");
  const [members, setMembers] = useState([]);
  const [teamMembers, setTeamMembers] = useState([]);

  try {
    useEffect(() => {
      const fetchTeamMembers = async () => {
        const response = await axios.get("http://localhost:9999/api/users");
        setTeamMembers(response.data.users);
      };
      fetchTeamMembers();
    }, []);
  } catch (error) {
    console.log(error);
  }
  const addMembers = (userId) => {
    const addMembers = members.includes(userId)
      ? members.filter((id) => id !== userId)
      : [...members, userId];
    setMembers(addMembers);
  };

  const createTeamMembers = async () => {
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
    <>
      <form onSubmit={createTeamMembers}>
        <input
          type="text"
          value={teamName}
          onChange={(e) => setTeamName(e.target.value)}
          placeholder="Enter team name"
        />
        <div>
          <label>Team Members</label>
          {teamMembers.map((user) => (
            <div key={user._id}>
              <input
                type="checkbox"
                id={user._id}
                key={user._id}
                value={user._id}
                checked={members.includes(user._id)}
                onChange={() => addMembers(user._id)}
              />
              <label htmlFor={user._id}>{user.name}</label>
            </div>
          ))}
        </div>
        <button type="submit">Create Team</button>
      </form>
    </>
  );
};

export default TeamForm;
