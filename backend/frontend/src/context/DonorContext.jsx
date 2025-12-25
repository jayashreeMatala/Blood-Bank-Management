import { createContext, useContext, useState } from "react";

const DonorContext = createContext();

export const DonorProvider = ({ children }) => {
  const [donors, setDonors] = useState([
    {
      id: 1,
      name: "Rahul Sharma",
      phone: "+91 9876543210",
      email: "rahul@gmail.com",
      blood: "A+",
      status: "Active",
      donations: 5,
      city: "Mumbai"
    },
    {
      id: 2,
      name: "Priya Patel",
      phone: "+91 9876543211",
      email: "priya@gmail.com",
      blood: "O+",
      status: "Active",
      donations: 3,
      city: "Delhi"
    }
  ]);
const updateDonor = (updated) => {
  setDonors(prev =>
    prev.map(d =>
      d.id === updated.id
        ? {
            ...d,               // 🔥 purana data rakho
            ...updated,          // ✏️ naya edited data
            status: d.status ?? "Active",
            donations: d.donations ?? 0
          }
        : d
    )
  );
};



  // ✅ ADD NEW DONOR
 const addDonor = (donor) => {
  setDonors(prev => [
    {
      id: Date.now(),
      status: "Active",
      donations: 0,
      ...donor
    },
    ...prev
  ]);
};


  return (
    <DonorContext.Provider value={{ donors, addDonor, updateDonor }}>
      {children}
    </DonorContext.Provider>
  );
};

export const useDonors = () => useContext(DonorContext);
