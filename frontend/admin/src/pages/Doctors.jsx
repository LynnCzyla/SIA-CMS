import React, { useState } from 'react';
import '../css/doctors.css';

// Simple SVG Icons
const SearchIcon = () => (
  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <circle cx="11" cy="11" r="8"></circle>
    <path d="m21 21-4.35-4.35"></path>
  </svg>
);

const EditIcon = () => (
  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <path d="M11 4H4a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2v-7"></path>
    <path d="M18.5 2.5a2.121 2.121 0 0 1 3 3L12 15l-4 1 1-4 9.5-9.5z"></path>
  </svg>
);

export default function Doctors() {
  const [searchTerm, setSearchTerm] = useState('');
  const [doctors] = useState([
    { id: 1, name: '', department: '', specialization: '' },
    { id: 2, name: '', department: '', specialization: '' },
    { id: 3, name: '', department: '', specialization: '' },
    { id: 4, name: '', department: '', specialization: '' },
    { id: 5, name: '', department: '', specialization: '' },
    { id: 6, name: '', department: '', specialization: '' },
    { id: 7, name: '', department: '', specialization: '' },
    { id: 8, name: '', department: '', specialization: '' },
    { id: 9, name: '', department: '', specialization: '' },
    { id: 10, name: '', department: '', specialization: '' },
  ]);

  return (
    <div className="doctors-page">
      <div className="doctors-header">
        <div className="doctors-header-left">
          <h2 className="doctors-page-title">Doctors and Departments</h2>
          <p className="doctors-breadcrumb">
            Doctors and Departments / Admin Dashboard
          </p>
        </div>
      </div>

      <div className="doctors-card">
        <div className="doctors-toolbar">
          <div className="doctors-toolbar-left">
            <span className="add-new-text">Add a New Doctor Profile</span>
          </div>
          <button className="btn publish-btn">Publish</button>
        </div>

        <div className="doctors-search-section">
          <div className="search-wrapper">
            <input
              type="text"
              placeholder="Filter"
              className="filter-input"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
            <button className="btn search-btn">
              <SearchIcon />
              <span>Search</span>
            </button>
          </div>
        </div>

        <div className="doctors-table-container">
          <table className="doctors-table">
            <thead>
              <tr className="table-header-row">
                <th className="table-header">Employee ID</th>
                <th className="table-header">Name</th>
                <th className="table-header">Department</th>
                <th className="table-header">Specialization</th>
                <th className="table-header">Edits By</th>
              </tr>
            </thead>
            <tbody>
              {doctors.map((doctor) => (
                <tr key={doctor.id} className="table-row">
                  <td className="table-cell">{doctor.id}</td>
                  <td className="table-cell">{doctor.name}</td>
                  <td className="table-cell">{doctor.department}</td>
                  <td className="table-cell">{doctor.specialization}</td>
                  <td className="table-cell">
                    <button className="edit-button">
                      <EditIcon />
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}