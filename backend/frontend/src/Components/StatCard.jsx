const StatCard = ({ icon, value, title }) => (
  <div className="col-md-3 col-6 mb-3">
    <div className="card text-center shadow-sm">
      <div className="card-body">
        <h3>{icon}</h3>
        <h5>{value}</h5>
        <small>{title}</small>
      </div>
    </div>
  </div>
);

export default StatCard;
