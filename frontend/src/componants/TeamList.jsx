import axios from "axios";
import { useEffect, useState } from "react";
import "../style/TeamList.css"; // Importing the CSS file

const TeamList = () => {
  const [teams, setTeams] = useState([]);
  console.log(teams);

  useEffect(() => {
    const fetchTeams = async () => {
      try {
        const team = await axios.get("http://localhost:9999/api/team");
        setTeams(team.data.teams);
      } catch (error) {
        console.log("not responding");
      }
    };
    fetchTeams();
  }, []);

  return (
    <div className="team-list-container">
      <h2 className="team-list-title">Teams</h2>
      <div className="team-list">
        {teams.map((team) => (
          <div key={team._id} className="team-item">
            <h3 className="team-name">{team.teamName}</h3>
            <div className="team-members">
              {team.members.map((member) => (
                <p key={member._id} className="team-member">
                  {member.name}
                </p>
              ))}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default TeamList;
