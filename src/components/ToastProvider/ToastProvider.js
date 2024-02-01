import React from "react";
export const ToastContext = React.createContext();

function ToastProvider({ children }) {
  const [toasts, setToasts] = React.useState([]);

  function createToast(message, variant) {
    const newToast = {
      id: crypto.randomUUID(),
      message: message,
      variant: variant,
    };
    const nextToasts = [...toasts, newToast];
    setToasts(nextToasts);
  }

  function closeToast(targetId) {
    const nextToasts = toasts.filter((toast) => {
      return toast.id !== targetId;
    });
    setToasts(nextToasts);
  }

  return (
    <ToastContext.Provider value={{ toasts, createToast, closeToast }}>
      {children}
    </ToastContext.Provider>
  );
}

export default ToastProvider;
