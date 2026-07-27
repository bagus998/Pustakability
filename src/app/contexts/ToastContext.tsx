import React, { createContext, useContext, useState } from "react";
import { CheckCircle2, AlertCircle, Info, X } from "lucide-react";

export type ToastType = "success" | "error" | "info";

export interface ToastMessage {
  id: string;
  message: string;
  type: ToastType;
}

interface ToastContextType {
  showToast: (message: string, type?: ToastType) => void;
}

const ToastContext = createContext<ToastContextType | undefined>(undefined);

export function ToastProvider({ children }: { children: React.ReactNode }) {
  const [toasts, setToasts] = useState<ToastMessage[]>([]);

  const showToast = (message: string, type: ToastType = "success") => {
    const id = String(Date.now() + Math.random());
    setToasts((prev) => [...prev, { id, message, type }]);

    setTimeout(() => {
      setToasts((prev) => prev.filter((t) => t.id !== id));
    }, 4000);
  };

  const removeToast = (id: string) => {
    setToasts((prev) => prev.filter((t) => t.id !== id));
  };

  return (
    <ToastContext.Provider value={{ showToast }}>
      {children}
      {/* Toast container */}
      <div
        className="fixed bottom-6 left-1/2 -translate-x-1/2 z-50 flex flex-col gap-2.5 max-w-md w-full px-4 pointer-events-none"
        aria-live="polite"
        aria-atomic="true"
      >
        {toasts.map((toast) => {
          const isSuccess = toast.type === "success";
          const isError = toast.type === "error";

          const bg = isSuccess ? "#0F1623" : isError ? "#7F1D1D" : "#1E293B";
          const border = isSuccess ? "#00D4AC" : isError ? "#F87171" : "#38BDF8";
          const iconColor = isSuccess ? "#00D4AC" : isError ? "#F87171" : "#38BDF8";

          return (
            <div
              key={toast.id}
              className="pointer-events-auto rounded-xl p-4 shadow-2xl flex items-center justify-between gap-3 text-white transition-all duration-300 transform translate-y-0 animate-in fade-in slide-in-from-bottom-5"
              style={{
                backgroundColor: bg,
                borderLeft: `4px solid ${border}`,
                boxShadow: "0 10px 25px -5px rgba(0, 0, 0, 0.4)",
              }}
              role="status"
            >
              <div className="flex items-center gap-3">
                {isSuccess && <CheckCircle2 className="w-5 h-5 flex-shrink-0" style={{ color: iconColor }} />}
                {isError && <AlertCircle className="w-5 h-5 flex-shrink-0" style={{ color: iconColor }} />}
                {!isSuccess && !isError && <Info className="w-5 h-5 flex-shrink-0" style={{ color: iconColor }} />}
                <span className="text-sm font-medium" style={{ lineHeight: 1.4 }}>
                  {toast.message}
                </span>
              </div>
              <button
                onClick={() => removeToast(toast.id)}
                className="p-1 rounded-lg hover:bg-white/10 text-gray-400 hover:text-white transition-colors"
                aria-label="Tutup notifikasi"
              >
                <X className="w-4 h-4" />
              </button>
            </div>
          );
        })}
      </div>
    </ToastContext.Provider>
  );
}

export function useToast() {
  const context = useContext(ToastContext);
  if (!context) {
    throw new Error("useToast must be used within a ToastProvider");
  }
  return context;
}
