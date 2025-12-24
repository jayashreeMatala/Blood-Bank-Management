import { createContext, useContext, useState } from "react";

const DonorContext = createContext();

export const DonorProvider = ({ children }) => {
  const [donors, setDonors] = useState([
    {
      id: 1,
      name: "John Smith",
      blood: "O+",
      donations: 5,
      lastDonation: "2025-01-15"
    },
    {
      id: 2,
      name: "Sarah Johnson",
      blood: "A+",
      donations: 3,
      lastDonation: "2024-12-20"
    },
    {
      id: 3,
      name: "Michael Brown",
      blood: "B-",
      donations: 12,
      lastDonation: "2025-02-01"
    }
  ]);

  const addDonationToDonor = (donorId, date) => {
    setDonors((prev) =>
      prev.map((d) =>
        d.id === donorId
          ? {
              ...d,
              donations: d.donations + 1,
              lastDonation: date
            }
          : d
      )
    );
  };

  return (
    <DonorContext.Provider value={{ donors, addDonationToDonor }}>
      {children}
    </DonorContext.Provider>
  );
};

export const useDonors = () => useContext(DonorContext);
