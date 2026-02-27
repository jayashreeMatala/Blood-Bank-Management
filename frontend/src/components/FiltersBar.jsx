const FiltersBar = () => {
  return (
    <div className="card p-3 mb-4">
      <h6>🔍 Filters</h6>
      <div className="row g-2">
        <div className="col-md-4">
          <input className="form-control" placeholder="Search by name or phone..." />
        </div>
        <div className="col-md-4">
          <select className="form-select">
            <option>All Status</option>
            <option>Requested</option>
            <option>Approved</option>
            <option>Confirmed</option>
            <option>Completed</option>
            <option>No-Show</option>
            <option>Cancelled</option>
          </select>
        </div>
        <div className="col-md-4">
          <select className="form-select">
            <option>All Dates</option>
            <option>Today</option>
            <option>Tomorrow</option>
            <option>Upcoming</option>
            <option>Past</option>
          </select>
        </div>
      </div>
    </div>
  );
};

export default FiltersBar;
