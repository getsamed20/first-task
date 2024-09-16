import React, { useEffect, useState } from "react";
import DeleteUserModal from "./DeleteUserModal";
import EditUser from "./EditUserModal"; 
import './usersList.css';
import axios from 'axios';
import { API_URL } from "../utils/constant";

export default function UsersList() {
  const [data, setData] = useState([]);
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [isEditing, setIsEditing] = useState(false);
  const [selectedUser, setSelectedUser] = useState(null);

  const token = 'eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJmb3VuZF91c2VyIjp7ImlkIjoiMDAxIiwidXNlcm5hbWUiOiJUZXN0LTAzLzA5IiwicGFzc3dvcmQiOiIwOTEwIiwiZW1haWwiOiJ0ZXN0QGdtYWlsLmNvbSIsImNvbXBhbnkiOiJjb21wYW55LTAxIiwiY3JlYXRlZF9hdCI6Im5vdyIsImlzX2FjdGl2ZSI6dHJ1ZX0sImV4cCI6MTcyNjA3NDM5OH0.EmriDl6TBo5WVlGU0mp-q9aYgj8JKf5sjk-DmjvhI-A';

  const fetchData = async () => {
    try {
      const response = await axios.get(`${API_URL}/users`, {
        headers: {
          'Authorization': `Bearer ${token}`
        }
      });
      setData(response.data); 
    } catch (error) {
      console.error('Error fetching users:', error);
    }
  };

  useEffect(()=>{  
    fetchData();
  }, []);

  const openDeleteModal = (index) => {
    setSelectedUser(index);
    setShowDeleteModal(true);
  };

  const closeDeleteModal = () => {
    setShowDeleteModal(false);
    setSelectedUser(null);
  };

  const deleteUser = () => {
    setData(data.filter((_, i) => i !== selectedUser));
    closeDeleteModal();
  };

  const openEditUser = (index) => {
    setSelectedUser(index);
    setIsEditing(true);
  };

  const saveUserChanges = (updatedUserName, updatedEmail, updatedCompany, updatedStatus) => {
    const updatedData = [...data];
    updatedData[selectedUser] = {
      ...updatedData[selectedUser],
      userName: updatedUserName,
      email: updatedEmail,
      company: updatedCompany,
      status: updatedStatus,
    };
    setData(updatedData);
    setIsEditing(false);
    setSelectedUser(null);
  };

  const closeEditModal = () => {
    setIsEditing(false);
    setSelectedUser(null);
  };

  return (
    <div className="table">
      <div className="header">
        <div className="row">
          <div className="col">Username</div>
          <div className="col">Company</div>
          <div className="col">Email</div>
          <div className="col">Status</div>
          <div className="col">Actions</div>
        </div>
      </div>

      <div className="body">
        {data.map((user, index) => (
          <div className="row" key={index}>
            <div className="col">{user.username}</div>
            <div className="col">{user.company}</div>
            <div className="col">{user.email}</div>
            <div className="col">
              <span className={`status ${user.is_active ? "active" : "inactive"}`}>
              {user.is_active ? "Active" : "Inactive"}
              </span>
            </div>
            <div className="col">
              <button className="operation" onClick={() => openDeleteModal(index)}>
                Delete
              </button>
              <button className="operation" onClick={() => openEditUser(index)}>
                Edit
              </button>
            </div>
          </div>
        ))}
      </div>
      
      {isEditing && (
        <EditUser
          userName={data[selectedUser].username}
          email={data[selectedUser].email}
          company={data[selectedUser].company}
          status={data[selectedUser].is_active}
          saveUserChanges={saveUserChanges}
          closeModal={closeEditModal}
        />
      )}

      <DeleteUserModal
        isOpen={showDeleteModal}
        onClose={closeDeleteModal}
        onDelete={deleteUser}
        userName={data[selectedUser]?.username}
      />
    </div>
  );
}
