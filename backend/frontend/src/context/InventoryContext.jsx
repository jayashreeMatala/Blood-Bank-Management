import { useInventory } from "../context/InventoryContext";

function Inventory() {
  const { inventory } = useInventory();

  return (
    <div className="container-fluid">
      <h2 className="mb-4">Blood Inventory</h2>

      <div className="row">
        {inventory.map((item, index) => (
          <div className="col-md-3 mb-3" key={index}>
            <div
              className={`card shadow-sm ${
                item.units < 10 ? "border-danger" : ""
              }`}
            >
              <div className="card-body text-center">
                <h4>{item.blood}</h4>
                <h2>{item.units}</h2>
                <small>Units Available</small>

                {item.units < 10 && (
                  <div className="text-danger mt-1">
                    ⚠ Low Stock
                  </div>
                )}
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

export default Inventory;
