import React from "react";
import "./modal.css"; 

export default function DeleteUserModal({ isOpen, onClose, onDelete, userName }) {
  if (!isOpen) return null;

  return (
    <div className="modal">
      <div className="modal-content">
        <p>Are you sure you want to delete user {userName}?</p>
        <div className="modal-buttons">
        <button onClick={onDelete} className="confirm">Delete</button>
          <button onClick={onClose} className="cancel">Cancel</button>
        </div>
      </div>
    </div>
  );
}
