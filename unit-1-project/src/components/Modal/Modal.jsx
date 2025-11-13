import React from 'react'

{/* Reusable modal for confirmations */}
const Modal = ({ isOpen, onClose, onConfirm, title = "Confirm Action", message }) => {
  if (!isOpen) return null

  return (
    <div className="modal-overlay" onClick={onClose}>
      <div className="modal-content" onClick={(e) => e.stopPropagation()}>
        <h2>{title}</h2>
        <p>{message}</p>
        <div className="modal-buttons">
          <button
            className="custom-button modal-confirm-button"
            onClick={onConfirm}
          >
            Confirm
          </button>
          <button
            className="custom-button modal-cancel-button"
            onClick={onClose}
          >
            Cancel
          </button>
        </div>
      </div>
    </div>
  )
}

export default Modal
