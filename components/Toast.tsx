"use client";
import { createContext, useContext, useState, useCallback, ReactNode } from "react";

interface ToastCtx { show: (msg: string) => void }
const Ctx = createContext<ToastCtx>({ show: () => {} });

export function ToastProvider({ children }: { children: ReactNode }) {
  const [msg, setMsg] = useState("");
  const [visible, setVisible] = useState(false);

  const show = useCallback((m: string) => {
    setMsg(m);
    setVisible(true);
    setTimeout(() => setVisible(false), 3000);
  }, []);

  return (
    <Ctx.Provider value={{ show }}>
      {children}
      {visible && (
        <div className="animate-toast fixed bottom-7 right-7 z-50 rounded-xl px-5 py-3 text-sm font-medium shadow-lg"
          style={{ background: "var(--ink)", color: "var(--paper)" }}>
          {msg}
        </div>
      )}
    </Ctx.Provider>
  );
}

export const useToast = () => useContext(Ctx);
