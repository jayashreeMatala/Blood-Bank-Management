import StatCard from "../Components/StatCard";
import UnlockedCard from "../Components/UnlockedCard";
import LockedCard from "../Components/LockedCard";
import LeaderboardRow from "../Components/LeaderboardRow";
import achievementData from "../data/achievementData";


const Achievements = () => {
  return (
    <div className="container my-4">

      {/* HEADER */}
      <div
        className="p-4 text-white rounded"
        style={{ background: "linear-gradient(90deg,#ff9800,#f44336)" }}
      >
        <h4>🏆 Achievements</h4>
        <small>Celebrate your life-saving journey</small>
      </div>

      {/* STATS */}
      <div className="row text-center mt-4">
        {achievementData.stats.map((item, i) => (
          <StatCard key={i} {...item} />
        ))}
      </div>

      {/* UNLOCKED */}
      <h5 className="mt-4">🔓 Unlocked Achievements</h5>
      <div className="row">
        {achievementData.unlocked.map((item, i) => (
          <UnlockedCard key={i} {...item} />
        ))}
      </div>

      {/* LOCKED */}
      <h5 className="mt-3">🔒 Locked Achievements</h5>
      <div className="row">
        {achievementData.locked.map((item, i) => (
          <LockedCard key={i} {...item} />
        ))}
      </div>

      {/* LEADERBOARD */}
      <h5 className="mt-4">🏆 Top Donors Leaderboard</h5>
      <div className="card">
        <ul className="list-group list-group-flush">
          {achievementData.leaderboard.map((user, i) => (
            <LeaderboardRow key={i} user={user} rank={i + 1} />
          ))}
        </ul>
      </div>

    </div>
  );
};

export default Achievements;
