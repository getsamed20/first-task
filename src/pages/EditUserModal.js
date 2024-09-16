import React, { useState } from 'react';
import './modal.css';
import './forms.css';

export default function EditUser({ userName, email, company, status, saveUserChanges, closeModal }) {
  const [editedUserName, setEditedUserName] = useState(userName);
  const [editedEmail, setEditedEmail] = useState(email);
  const [editedCompany, setEditedCompany] = useState(company);
  const [isActive, setIsActive] = useState(status);

  const handleSubmit = (e) => {
    e.preventDefault();
    saveUserChanges(editedUserName, editedEmail, editedCompany, isActive);
  };

  return (
    <div className="modal">
      <div className="modal-content">
        <form onSubmit={handleSubmit} className='edit-form'>
          <h1>Edit User</h1>
          <label htmlFor="username">
            User Name
            <input
              type="text"
              name="username"
              id="username"
              value={editedUserName}
              onChange={(e) => setEditedUserName(e.target.value)}
            />
          </label>
          <label htmlFor="email">
            Email
            <input
              type="email"
              name="email"
              id="email"
              value={editedEmail}
              onChange={(e) => setEditedEmail(e.target.value)}
            />
          </label>
          <label htmlFor="company">
            Company
            <input
              type="text"
              name="company"
              id="company"
              value={editedCompany}
              onChange={(e) => setEditedCompany(e.target.value)}
            />
          </label>
          <label htmlFor="status">
            <input
              type="checkbox"
              name="status"
              id="status"
              checked={isActive}
              onChange={(e) => setIsActive(e.target.checked)}
            />
            Active
          </label>

          <div className="modal-buttons">
            <button type="submit" className="confirm">Save</button>
            <button type="button" onClick={closeModal} className="cancel">Cancel</button>
            
          </div>
        </form>
      </div>
    </div>
  );
}
