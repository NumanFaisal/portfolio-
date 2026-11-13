"use client";

import { useState, useEffect } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { CheckCircle, XCircle, Info, X } from "lucide-react";

export type ToastType = "success" | "error" | "info";

interface Toast {
  id: string;
  message: string;
  type: ToastType;
}

let toastQueue: Toast[] = [];
let listeners: Array<(toasts: Toast[]) => void> = [];

function notifyListeners() {
  listeners.forEach((fn) => fn([...toastQueue]));
}

export function toast(message: string, type: ToastType = "info") {
  const id = Math.random().toString(36).slice(2);
  toastQueue = [...toastQueue, { id, message, type }];
  notifyListeners();
  setTimeout(() => {
    toastQueue = toastQueue.filter((t) => t.id !== id);
    notifyListeners();
  }, 5000);
}

const icons = {
  success: CheckCircle,
  error: XCircle,
  info: Info,
};

const colors = {
  success: "text-green-400",
  error: "text-red-400",
  info: "text-[var(--color-accent)]",
};

export function Toaster() {
  const [toasts, setToasts] = useState<Toast[]>([]);

  useEffect(() => {
    listeners.push(setToasts);
    return () => {
      listeners = listeners.filter((fn) => fn !== setToasts);
    };
  }, []);

  return (
    <div
      aria-live="polite"
      aria-label="Notifications"
      className="fixed bottom-6 right-6 z-[9998] flex flex-col gap-3 max-w-sm w-full"
    >
      <AnimatePresence>
        {toasts.map((t) => {
          const Icon = icons[t.type];
          return (
            <motion.div
              key={t.id}
              initial={{ opacity: 0, y: 20, scale: 0.95 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              exit={{ opacity: 0, y: -10, scale: 0.95 }}
              transition={{ duration: 0.3, ease: [0.19, 1, 0.22, 1] }}
              className="glass rounded-[var(--radius-lg)] p-4 flex items-start gap-3 shadow-[var(--shadow-lg)]"
            >
              <Icon
                className={`w-5 h-5 mt-0.5 flex-shrink-0 ${colors[t.type]}`}
              />
              <p className="text-sm text-[var(--color-text)] flex-1">
                {t.message}
              </p>
              <button
                onClick={() => {
                  toastQueue = toastQueue.filter((x) => x.id !== t.id);
                  notifyListeners();
                }}
                className="text-[var(--color-muted)] hover:text-[var(--color-text)] transition-colors"
                aria-label="Dismiss notification"
              >
                <X className="w-4 h-4" />
              </button>
            </motion.div>
          );
        })}
      </AnimatePresence>
    </div>
  );
}
