import { useState } from "react";

function Donors() {
  const [donors, setDonors] = useState([
    { id: 1, name: "John Smith", blood: "O+", phone: "9876543210", status: "Active" },
    { id: 2, name: "Sarah Johnson", blood: "A+", phone: "9123456789", status: "Active" }
  ]);

  const [name, setName] = useState("");
  const [blood, setBlood] = useState("");
  const [phone, setPhone] = useState("");

  const addDonor = () => {
    if (!name || !blood || !phone) {
      alert("All fields are required");
      return;
    }

    const newDonor = {
      id: Date.now(),
      name,
      blood,
      phone,
      status: "Active"
    };

    setDonors([...donors, newDonor]);
    setName("");
    setBlood("");
    setPhone("");
  };

  const deleteDonor = (id) => {
    setDonors(donors.filter((d) => d.id !== id));
  };

  return (
    <div className="container-fluid">
      <h2 className="mb-4">Donors</h2>

      {/* ADD DONOR FORM */}
      <div className="card shadow-sm mb-4">
        <div className="card-body">
          <h5 className="mb-3">Add Donor</h5>

          <div className="row">
            <div className="col-md-4">
              <input
                className="form-control"
                placeholder="Donor Name"
                value={name}
                onChange={(e) => setName(e.target.value)}
              />
            </div>

            <div className="col-md-3">
              <select
                className="form-control"
                value={blood}
                onChange={(e) => setBlood(e.target.value)}
              >
                <option value="">Blood Group</option>
                <option>A+</option>
                <option>A-</option>
                <option>B+</option>
                <option>B-</option>
                <option>O+</option>
                <option>O-</option>
                <option>AB+</option>
                <option>AB-</option>
              </select>
            </div>

            <div className="col-md-3">
              <input
                className="form-control"
                placeholder="Phone Number"
                value={phone}
                onChange={(e) => setPhone(e.target.value)}
              />
            </div>

            <div className="col-md-2">
              <button className="btn btn-danger w-100" onClick={addDonor}>
                Add Donor
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* DONORS TABLE */}
      <div className="card shadow-sm">
        <div className="card-body">
          <h5 className="mb-3">Registered Donors</h5>

          <table className="table table-bordered table-hover">
            <thead className="table-dark">
              <tr>
                <th>#</th>
                <th>Name</th>
                <th>Blood Group</th>
                <th>Phone</th>
                <th>Status</th>
                <th>Action</th>
              </tr>
            </thead>

            <tbody>
              {donors.length === 0 ? (
                <tr>
                  <td colSpan="6" className="text-center">
                    No donors found
                  </td>
                </tr>
              ) : (
                donors.map((d, index) => (
                  <tr key={d.id}>
                    <td>{index + 1}</td>
                    <td>{d.name}</td>
                    <td>
                      <span className="badge bg-danger">{d.blood}</span>
                    </td>
                    <td>{d.phone}</td>
                    <td>
                      <span className="badge bg-success">{d.status}</span>
                    </td>
                    <td>
                      <button
                        className="btn btn-sm btn-outline-danger"
                        onClick={() => deleteDonor(d.id)}
                      >
                        Delete
                      </button>
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}

export default Donors;
