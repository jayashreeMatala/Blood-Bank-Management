import { createContext, useContext, useState } from "react";

const TransferContext = createContext();

export function TransferProvider({ children }) {
  const [transfers, setTransfers] = useState([
    {
      id: "TRF-2024-001",
      type: "Outgoing",
      from: "Central Blood Bank",
      to: "Apollo Hospital",
      blood: "A+",
      units: 5,
      status: "Received",
      date: "Dec 10, 2024"
    }
  ]);

  const addTransfer = (data) => {
    setTransfers(prev => [
      {
        id: "TRF-" + Date.now(),
        status: data.type === "Outgoing" ? "In Transit" : "Received",
        ...data
      },
      ...prev
    ]);
  };

  const markReceived = (id) => {
    setTransfers(prev =>
      prev.map(t =>
        t.id === id ? { ...t, status: "Received" } : t
      )
    );
  };

  return (
    <TransferContext.Provider
      value={{ transfers, addTransfer, markReceived }}
    >
      {children}
    </TransferContext.Provider>
  );
}

export const useTransfers = () => useContext(TransferContext);
