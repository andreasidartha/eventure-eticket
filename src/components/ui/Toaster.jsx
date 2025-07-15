import React, { useState, useEffect } from 'react';
import { create } from 'zustand';

const useToastStore = create((set) => ({
  toasts: [],
  addToast: (message, type = 'info') =>
    set((state) => ({
      toasts: [...state.toasts, { id: Date.now(), message, type }],
    })),
  removeToast: (id) =>
    set((state) => ({
      toasts: state.toasts.filter((toast) => toast.id !== id),
    })),
}));

export const toast = (message, type) => useToastStore.getState().addToast(message, type);

export const Toaster = () => {
  const toasts = useToastStore((state) => state.toasts);
  const removeToast = useToastStore((state) => state.removeToast);

  return (
    <div className="fixed top-5 right-5 z-[100] space-y-2">
      {toasts.map((toast) => (
        <ToastMessage key={toast.id} {...toast} onDismiss={() => removeToast(toast.id)} />
      ))}
    </div>
  );
};

const ToastMessage = ({ id, message, type, onDismiss }) => {
  useEffect(() => {
    const timer = setTimeout(() => {
      onDismiss();
    }, 5000);
    return () => clearTimeout(timer);
  }, [onDismiss]);

  const baseClasses = 'px-4 py-3 rounded-md shadow-lg text-white flex items-center';
  const typeClasses = {
    success: 'bg-green-500',
    error: 'bg-red-500',
    info: 'bg-blue-500',
  };

  return (
    <div className={`${baseClasses} ${typeClasses[type] || typeClasses.info}`}>
      <span>{message}</span>
      <button onClick={onDismiss} className="ml-4 font-bold">
        &times;
      </button>
    </div>
  );
};
