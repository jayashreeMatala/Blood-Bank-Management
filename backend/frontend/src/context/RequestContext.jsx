import { createContext, useContext, useState } from "react";
import { useInventory } from "./InventoryContext"; // ✅ TOP IMPORT

const RequestContext = createContext();

export function RequestProvider({ children }) {
  const [requests, setRequests] = useState([]);

  // ✅ INVENTORY FUNCTION
  const { deductBlood } = useInventory();

  /* ======================
     ADD REQUEST
  ====================== */
  const addRequest = (data) => {
    setRequests((prev) => [
      {
        id: "REQ-" + Date.now(),
        status: "Pending",
        ...data
      },
      ...prev
    ]);
  };

  /* ======================
     APPROVE / REJECT
  ====================== */
  const approveRequest = (id) => {
    setRequests((prev) =>
      prev.map((r) =>
        r.id === id ? { ...r, status: "Approved" } : r
      )
    );
  };

  const rejectRequest = (id) => {
    setRequests((prev) => prev.filter((r) => r.id !== id));
  };

  /* ======================
     MARK FULFILLED
     👉 INVENTORY DEDUCT
  ====================== */
  const markFulfilled = (id) => {
    setRequests((prev) =>
      prev.map((r) => {
        if (r.id === id) {
          deductBlood(r.blood, Number(r.units)); // ✅ INVENTORY UPDATE
          return { ...r, status: "Fulfilled" };
        }
        return r;
      })
    );
  };

  return (
    <RequestContext.Provider
      value={{
        requests,
        addRequest,
        approveRequest,
        rejectRequest,
        markFulfilled
      }}
    >
      {children}
    </RequestContext.Provider>
  );
}

export const useRequests = () => useContext(RequestContext);
