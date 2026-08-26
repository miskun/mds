import { createContext, forwardRef, useCallback, useContext, useEffect, useMemo, useRef, useState } from "react";
import type { HTMLAttributes, ReactNode } from "react";
import { X } from "lucide-react";
import { IconButton } from "./Button";
import { cx } from "./utils";
import "./toast.css";

export type ToastTone = "neutral" | "success" | "warning" | "danger";

export interface ToastProps extends HTMLAttributes<HTMLDivElement> {
  title?: string;
  tone?: ToastTone;
  action?: ReactNode;
  onDismiss?: () => void;
}

export interface ToastMessage {
  id: string;
  title?: string;
  tone?: ToastTone;
  action?: ReactNode;
  children?: ReactNode;
  duration?: number;
  onDismiss?: () => void;
}

export type ToastInput = Omit<ToastMessage, "id"> & {
  id?: string;
};

export interface ToastContextValue {
  toasts: ToastMessage[];
  showToast: (toast: ToastInput) => string;
  dismissToast: (id: string) => void;
  clearToasts: () => void;
}

export type ToastPlacement = "top-right" | "top-left" | "bottom-right" | "bottom-left";

export interface ToastProviderProps {
  children: ReactNode;
  duration?: number;
  limit?: number;
  placement?: ToastPlacement;
}

const ToastContext = createContext<ToastContextValue | null>(null);
let toastId = 0;

export const Toast = forwardRef<HTMLDivElement, ToastProps>(function Toast({ title, tone = "neutral", action, onDismiss, className, children, role, ...props }, ref) {
  return (
    <div ref={ref} className={cx("mds-toast", `mds-toast--${tone}`, className)} role={role ?? (tone === "danger" ? "alert" : "status")} {...props}>
      <div className="mds-toast__content">
        {title ? <h3 className="mds-toast__title">{title}</h3> : null}
        {children ? <div className="mds-toast__body">{children}</div> : null}
      </div>
      {action ? <div className="mds-toast__action">{action}</div> : null}
      {onDismiss ? <IconButton size="sm" variant="ghost" label="Dismiss" icon={<X size={14} />} onClick={onDismiss} /> : null}
    </div>
  );
});

export function ToastProvider({ children, duration = 5000, limit = 5, placement = "bottom-right" }: ToastProviderProps) {
  const [toasts, setToasts] = useState<ToastMessage[]>([]);
  const toastsRef = useRef(toasts);

  useEffect(() => {
    toastsRef.current = toasts;
  }, [toasts]);

  const dismissToast = useCallback((id: string) => {
    const dismissedToast = toastsRef.current.find((toast) => toast.id === id);
    setToasts((currentToasts) => currentToasts.filter((toast) => toast.id !== id));
    dismissedToast?.onDismiss?.();
  }, []);

  const clearToasts = useCallback(() => {
    toastsRef.current.forEach((toast) => toast.onDismiss?.());
    setToasts([]);
  }, []);

  const showToast = useCallback(
    (toast: ToastInput) => {
      const id = toast.id ?? `toast-${++toastId}`;
      const nextToast: ToastMessage = {
        ...toast,
        id,
        duration: toast.duration ?? duration,
      };

      setToasts((currentToasts) => [...currentToasts.filter((currentToast) => currentToast.id !== id), nextToast].slice(-limit));
      return id;
    },
    [duration, limit],
  );

  const value = useMemo(
    () => ({
      toasts,
      showToast,
      dismissToast,
      clearToasts,
    }),
    [clearToasts, dismissToast, showToast, toasts],
  );

  return (
    <ToastContext.Provider value={value}>
      {children}
      <ToastViewport placement={placement} />
    </ToastContext.Provider>
  );
}

export function useToast() {
  const value = useContext(ToastContext);
  if (!value) throw new Error("useToast must be used within ToastProvider.");

  return value;
}

interface ToastViewportProps {
  placement: ToastPlacement;
}

function ToastViewport({ placement }: ToastViewportProps) {
  const { toasts, dismissToast } = useToast();

  if (!toasts.length) return null;

  return (
    <ol className={cx("mds-toast-viewport", `mds-toast-viewport--${placement}`)} aria-live="polite" aria-relevant="additions">
      {toasts.map((toast) => (
        <ToastHostItem key={toast.id} toast={toast} dismissToast={dismissToast} />
      ))}
    </ol>
  );
}

interface ToastHostItemProps {
  toast: ToastMessage;
  dismissToast: (id: string) => void;
}

function ToastHostItem({ toast, dismissToast }: ToastHostItemProps) {
  const dismissCurrentToast = useCallback(() => dismissToast(toast.id), [dismissToast, toast.id]);

  useEffect(() => {
    if (toast.duration === 0 || toast.duration === Infinity) return undefined;

    const timeout = window.setTimeout(dismissCurrentToast, toast.duration);
    return () => window.clearTimeout(timeout);
  }, [dismissCurrentToast, toast.duration]);

  return (
    <li className="mds-toast-viewport__item">
      <Toast title={toast.title} tone={toast.tone} action={toast.action} onDismiss={dismissCurrentToast}>
        {toast.children}
      </Toast>
    </li>
  );
}
