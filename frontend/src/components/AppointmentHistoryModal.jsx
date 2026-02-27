const AppointmentHistoryModal = ({ show, onClose, history }) => {
  if (!show) return null;

  return (
    <div className="modal-backdrop show">
      <div className="modal d-block">
        <div className="modal-dialog">
          <div className="modal-content p-3">

            <div className="d-flex justify-content-between">
              <h5>🕒 Appointment History</h5>
              <button onClick={onClose} className="btn-close" />
            </div>

            <hr />

            {history.map((item) => (
              <div key={item.id} className="border p-2 rounded mb-2">
                <strong>{item.name}</strong>
                <p className="mb-0">{item.date} · {item.time}</p>
                <span className="badge bg-success">{item.status}</span>
              </div>
            ))}

          </div>
        </div>
      </div>
    </div>
  );
};

export default AppointmentHistoryModal;
