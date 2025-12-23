import { createContext, useContext, useState } from "react";

const InventoryContext = createContext();

export const InventoryProvider = ({ children }) => {
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

  // ✅ deduct stock
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

  return (
    <InventoryContext.Provider
      value={{ inventory, deductInventory, getAvailableUnits }}
    >
      {children}
    </InventoryContext.Provider>
  );
};

export const useInventory = () => useContext(InventoryContext);
