import { createContext, useContext, useState } from "react";

const InventoryContext = createContext();

export const InventoryProvider = ({ children }) => {
  /* =======================
     BATCHES (MAIN SOURCE)
  ======================= */
  const [batches, setBatches] = useState([
    {
      id: "BATCH-2024-001",
      blood: "A+",
      units: 15,
      status: "Stored",
      test: "Passed",
      expiry: "2025-01-15",
      location: "Refrigerator A"
    }
  ]);

  /* =======================
     ADD / UPDATE / DELETE
  ======================= */
  const addBatch = (batch) => {
    setBatches((prev) => [...prev, batch]);
  };

  const deleteBatch = (id) => {
    setBatches((prev) => prev.filter((b) => b.id !== id));
  };

  const updateBatch = (updatedBatch) => {
    setBatches((prev) =>
      prev.map((b) =>
        b.id === updatedBatch.id ? updatedBatch : b
      )
    );
  };

  /* =======================
     DEDUCT BLOOD (REQUESTS)
     FEFO-LIKE LOGIC
  ======================= */
  const deductBlood = (blood, units) => {
    let remaining = Number(units);

    setBatches((prev) =>
      prev.map((b) => {
        if (
          b.blood === blood &&
          b.status === "Stored" &&
          remaining > 0
        ) {
          const deduct = Math.min(b.units, remaining);
          remaining -= deduct;

          return {
            ...b,
            units: b.units - deduct,
            status: b.units - deduct === 0 ? "Issued" : b.status
          };
        }
        return b;
      })
    );
  };

  /* =======================
     SUMMARY (DASHBOARD USE)
  ======================= */
  const summary = ["A+","A-","B+","B-","AB+","AB-","O+","O-"].map((bg) => {
    const totalUnits = batches
      .filter(
        (b) =>
          b.blood === bg &&
          b.status !== "Expired" &&
          b.status !== "Discarded"
      )
      .reduce((sum, b) => sum + Number(b.units), 0);

    return {
      blood: bg,
      units: totalUnits
    };
  });

  /* =======================
     INVENTORY = SUMMARY
  ======================= */
  const inventory = summary; // ✅ NOW CORRECT

  return (
    <InventoryContext.Provider
      value={{
        batches,
        summary,
        inventory,
        addBatch,
        deleteBatch,
        updateBatch,
        deductBlood
      }}
    >
      {children}
    </InventoryContext.Provider>
  );
};

export const useInventory = () => useContext(InventoryContext);
