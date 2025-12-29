import { createContext, useContext, useState } from "react";

const CampContext = createContext();

export function CampProvider({ children }) {
  const [camps, setCamps] = useState([
    {
  id: "CAMP-001",
  name: "Corporate Donation Camp",
  description: "Blood donation camp at TechPark",
  venue: "TechPark Convention Hall",
  city: "Bangalore",
  date: "January 15, 2025",
  startTime: "10:00",
  endTime: "16:00",
  organizer: "TechCorp Foundation",
  phone: "+91 8012345678",
  status: "Upcoming",
  registered: 32,
  collected: 0,
  target: 75
}

  ]);

  /* CREATE CAMP */
  const addCamp = (camp) => {
    setCamps((prev) => [
      {
        id: "CAMP-" + Date.now(),
        registered: 0,
        collected: 0,
        ...camp
      },
      ...prev
    ]);
  };

  return (
    <CampContext.Provider value={{ camps, addCamp }}>
      {children}
    </CampContext.Provider>
  );
}

export const useCamps = () => useContext(CampContext);
