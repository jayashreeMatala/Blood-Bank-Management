const UnlockedCard = ({ title, desc }) => (
  <div className="col-md-4 mb-3">
    <div className="card border-success">
      <div className="card-body">
        <h6 className="text-success">{title}</h6>
        <small>{desc}</small>
        <div className="text-success mt-1">✔ Unlocked</div>
      </div>
    </div>
  </div>
);

export default UnlockedCard;
