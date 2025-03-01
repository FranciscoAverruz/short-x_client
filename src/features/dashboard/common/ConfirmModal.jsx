/* eslint-disable react/prop-types */
// ConfirmModal.jsx
import React from 'react';
import Dialog from '@common/Dialog.jsx';

const ConfirmModal = ({ open, onClose, title, content, onConfirm, loading }) => {
  return (
    <Dialog open={open} onClose={onClose}>
      <div className="p-4">
        <h2 className="text-lg font-semibold">{title}</h2>
        <div>
          {React.isValidElement(content) ? content : <div>{content}</div>}
        </div>
        <div className="flex justify-end mt-4">
          <button onClick={onClose} className="bg-gray-300 p-2 rounded mr-2">Cancelar</button>
          <button onClick={onConfirm} className="bg-red-500 text-white p-2 rounded" disabled={loading}>
            {loading ? 'Eliminando...' : 'Confirmar'}
          </button>
        </div>
      </div>
    </Dialog>
  );
};

export default ConfirmModal;

