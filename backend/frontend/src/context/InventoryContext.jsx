import { createContext, useContext, useState } from "react";

const InventoryContext = createContext();

export const InventoryProvider = ({ children }) => {
  /* ================= INVENTORY ================= */
  const [inventory, setInventory] = useState([
    { blood: "A+", units: 45 },
    { blood: "A-", units: 8 },
    { blood: "B+", units: 32 },
    { blood: "B-", units: 12 },
    { blood: "O+", units: 55 },
    { blood: "O-", units: 6 },
    { blood: "AB+", units: 18 },
    { blood: "AB-", units: 5 }
  ]);

  /* ================= RECENT DONATIONS ================= */
  const [recentDonations, setRecentDonations] = useState([]);

  /* ================= UPCOMING CAMPS ================= */
  const [upcomingCamps, setUpcomingCamps] = useState([]);

  /* ================= INVENTORY LOGIC ================= */

  // ✅ deduct stock (used in Requests)
  const deductInventory = (blood, units) => {
    setInventory((prev) =>
      prev.map((item) =>
        item.blood === blood
          ? { ...item, units: Math.max(item.units - units, 0) }
          : item
      )
    );
  };

  // ✅ check availability
  const getAvailableUnits = (blood) => {
    return inventory.find((i) => i.blood === blood)?.units || 0;
  };

  /* ================= DASHBOARD HELPERS ================= */

  // ✅ add donation → Dashboard "Recent Donations"
  const addRecentDonation = (donation) => {
    setRecentDonations((prev) => [
      donation,
      ...prev
    ].slice(0, 5)); // last 5 only
  };

  // ✅ add camp → Dashboard "Upcoming Camps"
  const addUpcomingCamp = (camp) => {
    setUpcomingCamps((prev) => [...prev, camp]);
  };

  return (
    <InventoryContext.Provider
      value={{
        inventory,
        deductInventory,
        getAvailableUnits,

        // 👇 NEW (Dashboard driven)
        recentDonations,
        addRecentDonation,
        upcomingCamps,
        addUpcomingCamp
      }}
    >
      {children}
    </InventoryContext.Provider>
  );
};

export const useInventory = () => useContext(InventoryContext);
