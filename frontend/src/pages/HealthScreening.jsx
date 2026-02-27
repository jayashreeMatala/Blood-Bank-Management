import React, { useState, useEffect } from "react";
import { useDonors } from "../context/DonorContext";
import "./HealthScreening.css";
import { useNavigate } from "react-router-dom";


const navigate = useNavigate() {
  const [screeningRecords, setScreeningRecords] = useState([]);
  const [showDetails, setShowDetails] = useState(false);
const [selectedRecord, setSelectedRecord] = useState(null);

  const { donors } = useDonors();

  const [step, setStep] = useState("select");
  const [selectedDonor, setSelectedDonor] = useState(null);
  const [questionIndex, setQuestionIndex] = useState(0);
  const [answers, setAnswers] = useState([]);
  const [result, setResult] = useState(null);
  const [issues, setIssues] = useState([]);

  const [vitals, setVitals] = useState({
    hemoglobin: "",
    pulse: "",
    weight: "",
    temp: ""
  });

  const questions = [
  { text: "Are you feeling healthy and well today?", critical: true, failIf: "No" },
  { text: "Have you had a good meal in the last 3 hours?", critical: false },
  { text: "Have you had at least 6 hours of sleep last night?", critical: false },
  { text: "Are you currently taking any medications?", critical: true, failIf: "Yes" },
  { text: "Do you have any chronic diseases (diabetes, heart disease)?", critical: true, failIf: "Yes" },
  { text: "Have you had any surgery in the last 6 months?", critical: true, failIf: "Yes" },
  { text: "Have you donated blood in the last 56 days?", critical: true, failIf: "Yes" },
  { text: "Do you have any tattoos or piercings in the last 6 months?", critical: true, failIf: "Yes" }
];

  const generateScreeningId = () => {
  return "SCR-" + Date.now();
};


  const handleAnswer = (value) => {
    const updated = [...answers, value];
    setAnswers(updated);

    if (questionIndex < questions.length - 1) {
      setQuestionIndex(questionIndex + 1);
    } else {
      setStep("vitals");
    }
  };
const evaluate = async () => {

  if (answers.length !== questions.length) {
    alert("Please answer all questions.");
    return;
  }

  if (!vitals.hemoglobin || !vitals.pulse || !vitals.weight || !vitals.temp) {
    alert("Please fill all vital signs.");
    return;
  }

  const hemoglobin = parseFloat(vitals.hemoglobin);
  const weight = parseFloat(vitals.weight);
  const pulse = parseFloat(vitals.pulse);
  const temp = parseFloat(vitals.temp);

  let problems = [];
  let eligible = true;

  questions.forEach((q, i) => {
    if (q.critical && answers[i] === q.failIf) {
      eligible = false;
      problems.push(q.text);
    }
  });

  if (hemoglobin < 12.5) {
    eligible = false;
    problems.push("Hemoglobin level too low (minimum 12.5 g/dL)");
  }

  if (weight < 50) {
    eligible = false;
    problems.push("Minimum weight must be 50 kg");
  }

  if (pulse < 60 || pulse > 100) {
    eligible = false;
    problems.push("Pulse rate outside normal range (60-100 bpm)");
  }

  if (temp < 96 || temp > 100) {
    eligible = false;
    problems.push("Temperature abnormal");
  }

  const nextDate = eligible
    ? new Date(new Date().setDate(new Date().getDate() + 56))
    : new Date(new Date().setDate(new Date().getDate() + 90));

 try {
  const response = await fetch("http://localhost:5000/api/screenings", {
    method: "POST",
    headers: {
      "Content-Type": "application/json"
    },
    body: JSON.stringify({
      donor: selectedDonor._id, // IMPORTANT
      hemoglobin,
      pulse,
      weight,
      bp: vitals.bp,
      temp,
      answers,
      status: eligible ? "Eligible" : "Temporary Deferral",
      nextEligible: nextDate,
      deferralReason: problems.length > 0 ? problems[0] : null
    })
  });

  if (!response.ok) {
    throw new Error("Screening failed");
  }

  fetchScreenings(); // reload list

} catch (error) {
  alert(error.message);
}
  
  setIssues(problems);
  setResult(eligible);
  setStep("result");
};


  const reset = () => {
    setStep("select");
    setSelectedDonor(null);
    setQuestionIndex(0);
    setAnswers([]);
    setVitals({
      hemoglobin: "",
      pulse: "",
      weight: "",
      temp: ""
    });
    setIssues([]);
    setResult(null);
  };

  const progress =
    step === "questions"
      ? ((questionIndex + 1) / questions.length) * 100
      : step === "vitals"
      ? 90
      : step === "result"
      ? 100
      : 0;

    useEffect(() => {
  fetchScreenings();
}, []);

const fetchScreenings = async () => {
  try {
    const res = await fetch("http://localhost:5000/api/screenings");
    const data = await res.json();
    setScreeningRecords(data);
  } catch (error) {
    console.error(error);
  }
};  

  return (
    <div className="screening-page">

      <h2 className="title">Health Screening</h2>
      <p className="subtitle">Smart pre-donation assessment</p>

      {step !== "select" && (
        <div className="progress-wrapper">
          <div className="progress-bar" style={{ width: `${progress}%` }} />
        </div>
      )}

      {/* SELECT */}
    {step === "select" && (
  <div className="select-wrapper">

    <div className="select-card">

      <div className="select-icon">
        🩺
      </div>

      <h4 className="select-title">Select Donor</h4>
      <p className="select-subtitle">
        Begin comprehensive health assessment
      </p>

      {/* Search by phone */}
      <div className="form-group mt-4">
        <label>Search by Phone</label>
        <input
          type="text"
          className="form-control custom-input"
          placeholder="Enter phone number..."
        />
      </div>

      {/* OR Divider */}
      <div className="divider">
        <span>OR</span>
      </div>

      {/* Dropdown */}
      <div className="form-group">
        <label>Select Donor</label>
        <select
          className="form-select custom-input"
          onChange={(e) => {
            const donor = donors.find(
              (d) => String(d._id) === e.target.value
            );
            if (donor) {
              setSelectedDonor(donor);
              setStep("questions");
            }
          }}
        >
          <option value="">Choose from list</option>
          {donors.map((d) => (
            <option key={d._id} value={d._id}>
              {d.name} - {d.phone} ({d.blood})
            </option>
          ))}
        </select>
      </div>

    </div>
  </div>
)}

      {/* HEADER */}
      {selectedDonor && step !== "select" && (
        <div className="donor-header">
          <div>
            <strong>{selectedDonor.name}</strong>
            <div>{selectedDonor.blood} - {selectedDonor.phone}</div>
          </div>
        </div>
      )}

      {/* QUESTIONS */}
      {step === "questions" && (
        <div className="main-card question-card">
          <p>Question {questionIndex + 1} of {questions.length}</p>
          <h3>{questions[questionIndex].text}</h3>

          {questions[questionIndex].critical && (
            <span className="critical">Critical Question</span>
          )}

          <div className="btn-group">
            <button className="yes-btn" onClick={() => handleAnswer("Yes")}>Yes</button>
            <button className="no-btn" onClick={() => handleAnswer("No")}>No</button>
          </div>
        </div>
      )}

      {/* VITALS */}
     {step === "vitals" && (
  <div className="main-card vital-card">

    <div className="vital-icon">
      ❤️
    </div>

    <h3 className="vital-title">Vital Signs</h3>
    <p className="vital-subtitle">
      Record donor's health parameters
    </p>

    <div className="vital-grid">

      {/* Hemoglobin */}
      <div className="vital-field">
        <label>Hemoglobin (g/dL) *</label>
        <input
          type="number"
          placeholder="12.5 - 17.0"
          value={vitals.hemoglobin}
          onChange={(e) =>
            setVitals({ ...vitals, hemoglobin: e.target.value })
          }
        />
        <small className="hint">Minimum 12.5 g/dL required</small>
      </div>

      {/* Blood Pressure */}
      <div className="vital-field">
        <label>Blood Pressure *</label>
        <input
          type="text"
          placeholder="120/80"
          value={vitals.bp || ""}
          onChange={(e) =>
            setVitals({ ...vitals, bp: e.target.value })
          }
        />
      </div>

      {/* Pulse */}
      <div className="vital-field">
        <label>Pulse (bpm) *</label>
        <input
          type="number"
          placeholder="60 - 100"
          value={vitals.pulse}
          onChange={(e) =>
            setVitals({ ...vitals, pulse: e.target.value })
          }
        />
        <small className="hint">Normal range 60-100 bpm</small>
      </div>

      {/* Weight */}
      <div className="vital-field">
        <label>Weight (kg) *</label>
        <input
          type="number"
          placeholder="Min 50 kg"
          value={vitals.weight}
          onChange={(e) =>
            setVitals({ ...vitals, weight: e.target.value })
          }
        />
        <small className="hint">Minimum 50 kg required</small>
      </div>

      {/* Temperature */}
      <div className="vital-field full-width">
        <label>Temperature (°F)</label>
        <input
          type="number"
          placeholder="98.6"
          value={vitals.temp}
          onChange={(e) =>
            setVitals({ ...vitals, temp: e.target.value })
          }
        />
      </div>

    </div>

    <button
      className="complete-btn"
      onClick={evaluate}
    >
      Complete Screening →
    </button>

  </div>
)}

      {/* RESULT */}
{step === "result" && (
  <div className={`result-card ${result ? "success" : "fail"}`}>

    <div className="icon">
      {result ? "✓" : "✕"}
    </div>

    <h2>{result ? "Eligible to Donate" : "Not Eligible to Donate"}</h2>

    {/* Screening Summary Table */}
    <div className="table-responsive mt-4">
      <table className="table table-bordered screening-table">
        <thead>
          <tr>
            <th>Parameter</th>
            <th>Value</th>
            <th>Status</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td>Hemoglobin</td>
            <td>{vitals.hemoglobin} g/dL</td>
            <td className={vitals.hemoglobin >= 12.5 ? "text-success" : "text-danger"}>
              {vitals.hemoglobin >= 12.5 ? "Normal" : "Low"}
            </td>
          </tr>

          <tr>
            <td>Pulse</td>
            <td>{vitals.pulse} bpm</td>
            <td className={
              vitals.pulse >= 60 && vitals.pulse <= 100
                ? "text-success"
                : "text-danger"
            }>
              {vitals.pulse >= 60 && vitals.pulse <= 100
                ? "Normal"
                : "Abnormal"}
            </td>
          </tr>

          <tr>
            <td>Weight</td>
            <td>{vitals.weight} kg</td>
            <td className={vitals.weight >= 50 ? "text-success" : "text-danger"}>
              {vitals.weight >= 50 ? "Eligible" : "Underweight"}
            </td>
          </tr>

          <tr>
            <td>Temperature</td>
            <td>{vitals.temp} °F</td>
            <td className={
              vitals.temp >= 96 && vitals.temp <= 100
                ? "text-success"
                : "text-danger"
            }>
              {vitals.temp >= 96 && vitals.temp <= 100
                ? "Normal"
                : "Abnormal"}
            </td>
          </tr>
        </tbody>
      </table>
    </div>

    {/* Issues if any */}
    {!result && (
      <div className="alert alert-danger mt-3">
        <strong>Issues Found:</strong>
        <ul className="mb-0 mt-2">
          {issues.map((i, index) => (
            <li key={index}>{i}</li>
          ))}
        </ul>
      </div>
    )}

    <div className="result-buttons mt-4">
      <button className="btn btn-light" onClick={reset}>
        New Screening
      </button>

     <button
  className="btn btn-primary"
  disabled={!result}
  onClick={() => navigate("/donations")}
>
  Proceed to Donation
</button>
    </div>

  </div>
)}
{/* ===== SCREENING RECORDS SECTION ===== */}
{step === "select" && (
  <div className="mt-5">

    {/* Title */}
    <h3 className="fw-bold">Screening Records</h3>
    <p className="text-muted mb-4">
      Complete history of donor health screenings
    </p>

   <div className="row g-4 mb-4">

  {/* Today Screenings */}
  <div className="col-md-4">
    <div className="stat-card stat-neutral d-flex justify-content-between align-items-center p-4">
      <div>
        <h3 className="fw-bold mb-1">{screeningRecords.length}</h3>
        <small className="text-muted">Today's Screenings</small>
      </div>
      <div className="stat-icon bg-primary-subtle text-primary">
        <i className="bi bi-calendar"></i>
      </div>
    </div>
  </div>

  {/* Eligible */}
  <div className="col-md-4">
    <div className="stat-card stat-success d-flex justify-content-between align-items-center p-4">
      <div>
        <h3 className="fw-bold mb-1">
  {screeningRecords.filter(r => r.status === "Eligible").length}
</h3>

        <small>Eligible Donors</small>
      </div>
      <div className="stat-icon bg-success-subtle text-success">
        <i className="bi bi-check-circle"></i>
      </div>
    </div>
  </div>

  {/* Deferred */}
  <div className="col-md-4">
    <div className="stat-card stat-danger d-flex justify-content-between align-items-center p-4">
      <div>
        <h3 className="fw-bold mb-1">
  {screeningRecords.filter(r => r.status === "Temporary Deferral").length}
</h3>

        <small>Deferred</small>
      </div>
      <div className="stat-icon bg-danger-subtle text-danger">
        <i className="bi bi-x-circle"></i>
      </div>
    </div>
  </div>

</div>
{showDetails && selectedRecord && (
  <div className="details-overlay">
    <div className="details-modal">

      {/* Header */}
      <div className="details-header">
        <div className="d-flex align-items-center gap-2">
          <div className="details-icon">🩺</div>
          <h5 className="mb-0">Screening Details</h5>
        </div>

        <div className="d-flex align-items-center gap-3">
          <span
  className={`badge px-3 py-2 ${
    selectedRecord.status === "Eligible"
      ? "bg-success-subtle text-success"
      : "bg-warning-subtle text-warning"
  }`}
>
  {selectedRecord.status}
</span>

          <button
            className="close-btn"
            onClick={() => setShowDetails(false)}
          >
            ✕
          </button>
        </div>
      </div>

      {/* Donor Info */}
      <div className="details-box blue-box">
        <h6>Donor Information</h6>
        <div className="row mt-3">
          <div className="col-md-6">
            <strong>Name</strong>
            <div>{selectedRecord.name}</div>
          </div>
          <div className="col-md-6">
            <strong>Blood Group</strong>
            <div className="text-danger">{selectedRecord.blood}</div>
          </div>
          <div className="col-md-6 mt-3">
            <strong>Screening ID</strong>
            <div>{selectedRecord.id}</div>
          </div>
          <div className="col-md-6 mt-3">
            <strong>Date</strong>
            <div>{selectedRecord.date}</div>
          </div>
        </div>
      </div>
{/* Vital Signs */}
<div className="details-box">
  <h6>Vital Signs</h6>
  <div className="vital-grid">

    <div className="vital-card-small">
      <span>Hemoglobin</span>
      <h5>{selectedRecord.hemoglobin}</h5>
      <small>g/dL</small>
    </div>

    <div className="vital-card-small">
      <span>Blood Pressure</span>
      <h5>{selectedRecord.bp || "N/A"}</h5>
    </div>

    <div className="vital-card-small">
      <span>Pulse Rate</span>
      <h5>{selectedRecord.pulse}</h5>
      <small>bpm</small>
    </div>

    <div className="vital-card-small">
      <span>Weight</span>
      <h5>{selectedRecord.weight}</h5>
      <small>kg</small>
    </div>

    <div className="vital-card-small">
      <span>Temperature</span>
      <h5>{selectedRecord.temp || "N/A"}</h5>
      <small>°F</small>
    </div>

  </div>
</div>

      {/* Health Questionnaire */}
<div className="details-box purple-box">
  <h6>Health Questionnaire</h6>

  <div className="row mt-3">

    <div className="col-md-6 mb-3">
      <div className="question-card-small">
        <span>Recent Illness</span>
        <div className="text-danger fw-semibold">✕ No</div>
      </div>
    </div>

    <div className="col-md-6 mb-3">
      <div className="question-card-small">
  <span>Taking Medications</span>
  <div
    className={
      selectedRecord.answers && selectedRecord.answers[3] === "Yes"

        ? "text-success fw-semibold"
        : "text-danger fw-semibold"
    }
  >
    {selectedRecord.answers?.[3] === "Yes" ? "✓ Yes" : "✕ No"}
  </div>
</div>
</div>


    <div className="col-md-6 mb-3">
      <div className="question-card-small">
        <span>Allergies</span>
        <div className="text-danger fw-semibold">✕ No</div>
      </div>
    </div>

    <div className="col-md-6 mb-3">
      <div className="question-card-small">
        <span>Chronic Disease</span>
        <div className="text-danger fw-semibold">✕ No</div>
      </div>
    </div>

    <div className="col-md-6 mb-3">
      <div className="question-card-small">
        <span>Recent Tattoo</span>
        <div className="text-danger fw-semibold">✕ No</div>
      </div>
    </div>

    <div className="col-md-6 mb-3">
      <div className="question-card-small">
        <span>Pregnancy</span>
        <div className="text-danger fw-semibold">✕ No</div>
      </div>
    </div>

    <div className="col-md-6 mb-3">
      <div className="question-card-small">
        <span>Recent Travel</span>
        <div className="text-danger fw-semibold">✕ No</div>
      </div>
    </div>

    <div className="col-md-6 mb-3">
      <div className="question-card-small">
        <span>HIV/Hepatitis</span>
        <div className="text-danger fw-semibold">✕ No</div>
      </div>
    </div>

  </div>
</div>


     {/* Next Eligible */}
<div className="details-box blue-box">
  <strong>Next Eligible Date</strong>
  <div>{selectedRecord.nextEligible}</div>
</div>
{selectedRecord.status === "Temporary Deferral" && (
  <div className="details-box red-box mt-3">
    <strong>⚠ Deferral Reasons</strong>
    <div className="mt-2">
      {selectedRecord.deferralReason}
    </div>
  </div>
)}

    </div>
  </div>
)}



    {/* Filter */}
    <div className="card shadow-sm p-3 mb-4">
      <div className="row g-3">
        <div className="col-md-6">
          <input
            type="text"
            className="form-control"
            placeholder="Search by name or screening ID..."
          />
        </div>
        <div className="col-md-6">
          <select className="form-select">
            <option>All Status</option>
            <option>Eligible</option>
            <option>Temporary Deferral</option>
          </select>
        </div>
      </div>
    </div>

    {/* Records List */}
    {screeningRecords.map((record, index) => (
      <div key={index} className="record-card shadow-sm p-4 mb-4 rounded">

        <div className="d-flex justify-content-between align-items-center mb-3">
          <div>
            <h5 className="mb-1">{record.donor?.name}</h5>
            <small className="text-muted">{record.id}</small>
          </div>

          <span
  onClick={() => {
  setSelectedRecord(record);
  setShowDetails(true);
}}

  style={{ cursor: record.status === "Eligible" ? "pointer" : "default" }}
  className={`badge px-3 py-2 ${
    record.status === "Eligible"
      ? "bg-success-subtle text-success"
      : "bg-warning-subtle text-warning"
  }`}
>
  {record.status}
</span>

        </div>

        <div className="row text-muted small">
          <div className="col-md-2">
            <strong>Blood:</strong> {record.donor?.bloodGroup}
          </div>
          <div className="col-md-2">
            <strong>Date:</strong> {new Date(record.createdAt).toLocaleDateString()}
          </div>
          <div className="col-md-3">
            <strong>Hemoglobin:</strong> {record.hemoglobin}
          </div>
          <div className="col-md-2">
            <strong>Weight:</strong> {record.weight}
          </div>
          <div className="col-md-3">
            <strong>Pulse:</strong> {record.pulse}
          </div>
        </div>

        {record.status === "Eligible" && (
  <div className="approved-box mt-3">
    APPROVED BY STAFF
  </div>
)}
      </div>
    ))}

  </div>
)}



    </div>
  );
}

export default HealthScreening;
