import { createContext, useContext, useState } from "react";

const AppointmentContext = createContext();

export function AppointmentProvider({ children }) {
  const [appointments, setAppointments] = useState([]);

  const addAppointment = (data) => {
    setAppointments(prev => [
      {
        id: "APT-" + Date.now(),
        status: "Scheduled",
        ...data
      },
      ...prev
    ]);
  };

  const markCompleted = (id) => {
    setAppointments(prev =>
      prev.map(a =>
        a.id === id ? { ...a, status: "Completed" } : a
      )
    );
  };

  return (
    <AppointmentContext.Provider
      value={{
        appointments,
        addAppointment,
        markCompleted
      }}
    >
      {children}
    </AppointmentContext.Provider>
  );
}

export const useAppointments = () => useContext(AppointmentContext);
