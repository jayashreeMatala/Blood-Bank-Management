import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App";
import { InventoryProvider } from "./context/InventoryContext";
import { DonorProvider } from "./context/DonorContext";
import "bootstrap/dist/css/bootstrap.min.css";

const root = ReactDOM.createRoot(document.getElementById("root"));

root.render(
  <InventoryProvider>
    <DonorProvider>
      <App />
    </DonorProvider>
  </InventoryProvider>
);
