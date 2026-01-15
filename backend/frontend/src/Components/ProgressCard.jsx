const ProgressCard = ({ title, value, total }) => {
  const percent = Math.min((value / total) * 100, 100);

  return (
    <div className="col-md-4 mb-3">
      <div className="card p-3">
        <h6>{title}</h6>
        <div className="progress">
          <div className="progress-bar bg-warning"
            style={{ width: `${percent}%` }}>
          </div>
        </div>
        <small>{value}/{total} completed</small>
      </div>
    </div>
  );
};

export default ProgressCard;
