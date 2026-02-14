import React, { useState } from "react";
import { useDonors } from "../context/DonorContext";
import "./HealthScreening.css";

function HealthScreening() {
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
    { text: "Are you feeling healthy and well today?", critical: true },
    { text: "Have you had a good meal in the last 3 hours?", critical: false },
    { text: "Have you had at least 6 hours of sleep last night?", critical: false },
    { text: "Are you currently taking any medications?", critical: true },
    { text: "Do you have any chronic diseases (diabetes, heart disease)?", critical: true },
    { text: "Have you had any surgery in the last 6 months?", critical: true },
    { text: "Have you donated blood in the last 56 days?", critical: true },
    { text: "Do you have any tattoos or piercings in the last 6 months?", critical: true }
  ];

  const handleAnswer = (value) => {
    const updated = [...answers, value];
    setAnswers(updated);

    if (questionIndex < questions.length - 1) {
      setQuestionIndex(questionIndex + 1);
    } else {
      setStep("vitals");
    }
  };

  const evaluate = () => {
    if (!vitals.hemoglobin || !vitals.pulse || !vitals.weight || !vitals.temp) {
      alert("Please fill all vital signs.");
      return;
    }

    let problems = [];
    let eligible = true;

    questions.forEach((q, i) => {
      if (q.critical && answers[i] === "Yes") {
        eligible = false;
        problems.push(q.text);
      }
    });

    if (vitals.hemoglobin < 12.5) {
      eligible = false;
      problems.push("Hemoglobin level too low (minimum 12.5 g/dL)");
    }

    if (vitals.weight < 50) {
      eligible = false;
      problems.push("Minimum weight must be 50 kg");
    }

    if (vitals.pulse < 60 || vitals.pulse > 100) {
      eligible = false;
      problems.push("Pulse rate outside normal range (60-100 bpm)");
    }

    if (vitals.temp < 96 || vitals.temp > 100) {
      eligible = false;
      problems.push("Temperature abnormal");
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
              (d) => String(d.id) === e.target.value
            );
            if (donor) {
              setSelectedDonor(donor);
              setStep("questions");
            }
          }}
        >
          <option value="">Choose from list</option>
          {donors.map((d) => (
            <option key={d.id} value={d.id}>
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
      >
        Proceed to Donation
      </button>
    </div>

  </div>
)}


    </div>
  );
}

export default HealthScreening;
