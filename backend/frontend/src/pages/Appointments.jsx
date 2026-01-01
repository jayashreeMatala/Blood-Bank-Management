import { useState } from "react";
import { useAppointments } from "../context/AppointmentContext";
import BookAppointmentModal from "../Components/BookAppointmentModal";

function Appointments() {
  const { appointments, markCompleted } = useAppointments();
  const [showBook, setShowBook] = useState(false);
  const today = new Date().toISOString().slice(0, 10);

  const todayCount = appointments.filter(a => a.date === today).length;
  const upcoming = appointments.filter(a => a.date > today).length;
  const completed = appointments.filter(a => a.status === "Completed").length;

  return (
    <div className="container-fluid p-4">

      <div className="d-flex justify-content-between mb-4">
        <div>
          <h3 className="fw-bold">Appointments</h3>
          <p className="text-muted">Schedule and manage donor appointments</p>
        </div>

         <button
          className="btn btn-danger btn-sm"
          style={{ height: "38px" }}
          onClick={() => setShowBook(true)}
        >
          + Book Appointments
        </button>
        </div>

      {/* STATS */}
      <div className="row g-3 mb-4">
        <Stat title="Today" value={todayCount} />
        <Stat title="Upcoming" value={upcoming} />
        <Stat title="Completed" value={completed} />
        <Stat title="Total" value={appointments.length} />
      </div>

      {/* LIST */}
      <div className="card shadow-sm">
        <div className="card-body">
          {appointments.length === 0 && <p className="text-muted">No appointments</p>}

          {appointments.map(a => (
            <div key={a.id} className="d-flex justify-content-between border-bottom py-2">
              <div>
                <strong>{a.time}</strong> — {a.donor}
                <div className="small text-muted">{a.blood} · {a.type}</div>
              </div>

              {a.status !== "Completed" && (
                <button
                  className="btn btn-sm btn-success"
                  onClick={() => markCompleted(a.id)}
                >
                  Mark Completed
                </button>
              )}
            </div>
          ))}
        </div>

      </div>

      {showBook && (
  <BookAppointmentModal onClose={() => setShowBook(false)} />
)}

    </div>
  );
}

function Stat({ title, value }) {
  return (
    <div className="col-md-3">
      <div className="card shadow-sm">
        <div className="card-body">
          <small className="text-muted">{title}</small>
          <h3 className="fw-bold">{value}</h3>
        </div>
      </div>
    </div>
  );
}

export default Appointments;
