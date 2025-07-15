import React, { useState } from 'react';
import './AddEmployeeModal.css';

const AddEmployeeModal = ({ onAdd, onClose }) => {
  const [formData, setFormData] = useState({
    first_name: '',
    last_name: '',
    contact_email: '',
    department: '',
    position: '',
    location: '',
    status: 'ACTIVE'
  });

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    onAdd(formData);
  };

  return (
    <div className="modal-backdrop">
      <div className="modal">
        <div className="modal-header">
          <h2>Add Employee</h2>
          <button className="close-btn" onClick={onClose}>✖</button>
        </div>

        <form onSubmit={handleSubmit}>
          <input name="first_name" placeholder="First Name" onChange={handleChange} required />
          <input name="last_name" placeholder="Last Name" onChange={handleChange} required />
          <input name="contact_email" placeholder="Email" onChange={handleChange} required />
          <input name="department" placeholder="Department" onChange={handleChange} />
          <input name="position" placeholder="Position" onChange={handleChange} />
          <input name="location" placeholder="Location" onChange={handleChange} />
          <select name="status" value={formData.status} onChange={handleChange}>
            <option value="ACTIVE">Active</option>
            <option value="INACTIVE">Inactive</option>
            <option value="TERMINATED">Terminated</option>
          </select>

          <div className="modal-actions">
            <button type="submit" className="save-btn">Save</button>
            <button type="button" className="cancel-btn" onClick={onClose}>Cancel</button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default AddEmployeeModal;
  