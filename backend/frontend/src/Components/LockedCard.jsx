const LockedCard = ({ title, current, total }) => {
  const percent = Math.round((current / total) * 100);

  return (
    <div className="col-md-4 mb-3">
      <div className="card p-3">
        <h6>{title}</h6>
        <div className="progress mb-1">
          <div
            className="progress-bar bg-warning"
            style={{ width: `${percent}%` }}
          />
        </div>
        <small>{current}/{total} completed</small>
      </div>
    </div>
  );
};

export default LockedCard;
