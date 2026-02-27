import { createContext, useContext, useEffect, useState } from "react";

const DonorContext = createContext();

export const DonorProvider = ({ children }) => {
  const [donors, setDonors] = useState([]);

  // 🔥 GET donors from backend
  const fetchDonors = async () => {
    try {
      const response = await fetch("http://localhost:5000/api/donors");
      const data = await response.json();
      setDonors(data);
    } catch (error) {
      console.error("Error fetching donors:", error);
    }
  };

  useEffect(() => {
    fetchDonors();
  }, []);

  return (
    <DonorContext.Provider value={{ donors, fetchDonors }}>
      {children}
    </DonorContext.Provider>
  );
};

export const useDonors = () => useContext(DonorContext);