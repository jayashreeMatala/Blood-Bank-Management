const AppointmentDetailsModal = ({ show, onClose, data }) => {
  if (!show) return null;

  return (
    <div className="modal-backdrop show">
      <div className="modal d-block">
        <div className="modal-dialog modal-lg">
          <div className="modal-content p-3">

            <div className="d-flex justify-content-between">
              <h5>📅 Appointment Details</h5>
              <button onClick={onClose} className="btn-close" />
            </div>

            <hr />

            <div className="p-3 bg-light rounded mb-3">
              <h6>👤 Donor Information</h6>
              <p>Name: {data.name}</p>
              <p>Phone: {data.phone}</p>
              <p>Blood Group: {data.bloodGroup}</p>
              <p>Type: {data.type}</p>
            </div>

            <div className="p-3 bg-white rounded mb-3 border">
              <h6>📋 Appointment Details</h6>
              <p>Date: {data.date}</p>
              <p>Time: {data.time}</p>
              <p>Location: {data.location}</p>
            </div>

            <div className="alert alert-success text-center">
              ✅ Appointment Completed <br />
              Donation record has been created
            </div>

          </div>
        </div>
      </div>
    </div>
  );
};

export default AppointmentDetailsModal;
