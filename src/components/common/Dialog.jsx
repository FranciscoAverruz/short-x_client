/* eslint-disable react/prop-types */
/* eslint-disable no-unused-vars */
import React from 'react';

const Dialog = ({ open, onClose, children }) => {
  if (!open) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-60">
      <div className="bg-white rounded-lg shadow-lg p-5">
        <button onClick={onClose} className="absolute top-2 right-2 text-xl">
          &times;
        </button>
        {children}
      </div>
    </div>
  );
};

export const DialogHeader = ({ children }) => (
  <div className="text-lg font-bold mb-3">{children}</div>
);

export const DialogTitle = ({ children }) => (
  <h2 className="text-xl font-semibold">{children}</h2>
);

export const DialogContent = ({ children }) => (
  <div className="mb-3">{children}</div>
);

export const DialogFooter = ({ children }) => (
  <div className="flex justify-end">{children}</div>
);

export default Dialog;
