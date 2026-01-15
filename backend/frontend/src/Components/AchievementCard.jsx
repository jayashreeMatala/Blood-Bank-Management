const AchievementCard = ({ title, value, icon }) => (
  <div className="col-md-3 col-6 mb-3">
    <div className="card text-center shadow-sm">
      <div className="card-body">
        <h4>{icon}</h4>
        <h5>{value}</h5>
        <small>{title}</small>
      </div>
    </div>
  </div>
);
export default AchievementCard;
