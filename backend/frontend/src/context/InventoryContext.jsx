import { createContext, useContext, useState } from "react";

const InventoryContext = createContext();

export const InventoryProvider = ({ children }) => {
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

  // ✅ ADD BATCH
  const addBatch = (batch) => {
    setBatches((prev) => [...prev, batch]);
  };

  // ✅ DELETE BATCH
  const deleteBatch = (id) => {
    setBatches((prev) => prev.filter((b) => b.id !== id));
  };

  // ✅ EDIT BATCH
  const updateBatch = (updatedBatch) => {
    setBatches((prev) =>
      prev.map((b) => (b.id === updatedBatch.id ? updatedBatch : b))
    );
  };

  // ✅ SUMMARY CALCULATION (AUTO UPDATE)
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

  return (
    <InventoryContext.Provider
      value={{ batches, summary, addBatch, deleteBatch, updateBatch }}
    >
      {children}
    </InventoryContext.Provider>
  );
};

export const useInventory = () => useContext(InventoryContext);
