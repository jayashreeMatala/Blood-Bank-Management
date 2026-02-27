import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App";
import "bootstrap/dist/css/bootstrap.min.css";

/* ===== CONTEXT PROVIDERS ===== */
import { InventoryProvider } from "./context/InventoryContext";
import { DonorProvider } from "./context/DonorContext";
import { RequestProvider } from "./context/RequestContext";
import { AppointmentProvider } from "./context/AppointmentContext";
import { CampProvider } from "./context/CampContext";
import { AuthProvider } from "./context/AuthContext";
import { TransferProvider } from "./context/TransferContext";


const root = ReactDOM.createRoot(document.getElementById("root"));

root.render(
  <React.StrictMode>
    <AuthProvider>
      <InventoryProvider>
        <DonorProvider>
          <RequestProvider>
            <AppointmentProvider>
              <CampProvider>
                 <TransferProvider>
                <App />
                </TransferProvider>
              </CampProvider>
            </AppointmentProvider>
          </RequestProvider>
        </DonorProvider>
      </InventoryProvider>
    </AuthProvider>
  </React.StrictMode>
);
