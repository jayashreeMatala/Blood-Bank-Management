import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App";

import { InventoryProvider } from "./context/InventoryContext";

// Bootstrap CSS
import "bootstrap/dist/css/bootstrap.min.css";

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <InventoryProvider>
    <App />
  </InventoryProvider>
);

