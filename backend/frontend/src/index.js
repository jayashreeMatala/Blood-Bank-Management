import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App";
import "bootstrap/dist/css/bootstrap.min.css";

import { InventoryProvider } from "./context/InventoryContext";
import { DonorProvider } from "./context/DonorContext";
import { RequestProvider } from "./context/RequestContext";
import { AppointmentProvider } from "./context/AppointmentContext";

const root = ReactDOM.createRoot(document.getElementById("root"));

root.render(
  <InventoryProvider>
    <DonorProvider>
      <RequestProvider>
        <AppointmentProvider>
          <App />
        </AppointmentProvider>
      </RequestProvider>
    </DonorProvider>
  </InventoryProvider>
);
