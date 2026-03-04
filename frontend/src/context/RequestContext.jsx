import { createContext, useContext, useState, useEffect } from "react";
import axios from "axios";

const API = "http://localhost:5000/api/requests";
const RequestContext = createContext();

export function RequestProvider({ children }) {
  const [requests, setRequests] = useState([]);

  useEffect(() => {
    axios.get(API)
      .then(res => setRequests(res.data))
      .catch(err => console.log(err));
  }, []);

  // ADD
  const addRequest = async (data) => {
    try {
      const res = await axios.post(API, data);
      setRequests(prev => [res.data, ...prev]);
    } catch (err) {
      console.log(err);
    }
  };

  // APPROVE
  const approveRequest = async (id) => {
    try {
      const res = await axios.put(`${API}/${id}/approve`);
      setRequests(prev =>
        prev.map(r => r._id === id ? res.data : r)
      );
    } catch (err) {
      console.log("APPROVE ERROR:", err.response?.data || err.message);
      alert(err.response?.data?.message || "Approve failed");
    }
  };

  const deleteRequest = async (id) => {
  try {
    await axios.delete(`${API}/${id}`);

    setRequests(prev =>
      prev.filter(r => r._id !== id)
    );
  } catch (err) {
    console.log(err);
  }
};

  // REJECT
  const rejectRequest = async (id) => {
    try {
      const res = await axios.put(`${API}/${id}/reject`);
      setRequests(prev =>
        prev.map(r => r._id === id ? res.data : r)
      );
    } catch (err) {
      console.log("REJECT ERROR:", err);
    }
  };

  // FULFILL
  const markFulfilled = async (id) => {
    try {
      const res = await axios.put(`${API}/${id}/fulfill`);
      setRequests(prev =>
        prev.map(r => r._id === id ? res.data : r)
      );
    } catch (err) {
      console.log("FULFILL ERROR:", err.response?.data || err.message);
      alert(err.response?.data?.message || "Fulfill failed");
    }
  };

  return (
    <RequestContext.Provider
      value={{
        requests,
        addRequest,
        approveRequest,
        rejectRequest,
        markFulfilled,
        deleteRequest
      }}
    >
      {children}
    </RequestContext.Provider>
  );
}

export const useRequests = () => useContext(RequestContext);