import { createContext, useContext, useState } from "react";

const RequestContext = createContext();

export function RequestProvider({ children }) {
  const [requests, setRequests] = useState([
    {
      id: "REQ-2024-001",
      hospital: "Apollo Hospital",
      doctor: "Dr. Sharma",
      blood: "O+",
      units: 4,
      priority: "Emergency",
      status: "Pending",
      date: "Jan 14, 2025"
    },
    {
      id: "REQ-2024-002",
      hospital: "Fortis Hospital",
      doctor: "Dr. Patel",
      blood: "A+",
      units: 2,
      priority: "Urgent",
      status: "Approved",
      date: "Jan 15, 2025"
    },
    {
      id: "REQ-2024-003",
      hospital: "Max Hospital",
      doctor: "Dr. Kumar",
      blood: "B+",
      units: 3,
      priority: "Normal",
      status: "Pending",
      date: "Jan 18, 2025"
    },
    {
      id: "REQ-2024-004",
      hospital: "AIIMS",
      doctor: "Dr. Singh",
      blood: "AB+",
      units: 1,
      priority: "Normal",
      status: "Fulfilled",
      date: "Jan 20, 2025"
    }
  ]);

  const approveRequest = (id) => {
    setRequests(prev =>
      prev.map(r =>
        r.id === id ? { ...r, status: "Approved" } : r
      )
    );
  };

  const rejectRequest = (id) => {
    setRequests(prev => prev.filter(r => r.id !== id));
  };

  const markFulfilled = (id) => {
    setRequests(prev =>
      prev.map(r =>
        r.id === id ? { ...r, status: "Fulfilled" } : r
      )
    );
  };

  return (
    <RequestContext.Provider value={{
      requests,
      approveRequest,
      rejectRequest,
      markFulfilled
    }}>
      {children}
    </RequestContext.Provider>
  );
}

export const useRequests = () => useContext(RequestContext);
