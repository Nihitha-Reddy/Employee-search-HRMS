import React, { useState, useEffect } from 'react';
import './FilterPanel.css';

const FilterPanel = ({
  onClose,
  onApply,
  filterOptions,
  currentFilters
}) => {
  const [tempStatus, setTempStatus] = useState([]);
  const [tempDepartment, setTempDepartment] = useState('');
  const [tempPosition, setTempPosition] = useState('');
  const [tempLocation, setTempLocation] = useState('');

  useEffect(() => {
    setTempStatus(currentFilters.status);
    setTempDepartment(currentFilters.department);
    setTempPosition(currentFilters.position);
    setTempLocation(currentFilters.location);
  }, [currentFilters]);

  const toggleStatus = (value) => {
    if (tempStatus.includes(value)) {
      setTempStatus(tempStatus.filter(s => s !== value));
    } else {
      setTempStatus([...tempStatus, value]);
    }
  };

  const handleApply = () => {
    onApply({
      status: tempStatus,
      department: tempDepartment,
      position: tempPosition,
      location: tempLocation
    });
  };

  return (
    <div className="filter-panel">
      <div className="filter-header">
        <h2>Filters</h2>
        <button className="close-btn" onClick={onClose}>×</button>
      </div>

      <div className="filter-section">
        <strong>Status</strong>
        {['ACTIVE', 'NOT_STARTED', 'TERMINATED'].map(s => (
          <label key={s} className="checkbox">
            <input
              type="checkbox"
              checked={tempStatus.includes(s)}
              onChange={() => toggleStatus(s)}
            /> {s}
          </label>
        ))}
      </div>

      <div className="filter-section">
        <strong>Department</strong>
        <select value={tempDepartment} onChange={e => setTempDepartment(e.target.value)}>
          <option value="">All</option>
          {filterOptions.departments.map(dep => <option key={dep}>{dep}</option>)}
        </select>
      </div>

      <div className="filter-section">
        <strong>Position</strong>
        <select value={tempPosition} onChange={e => setTempPosition(e.target.value)}>
          <option value="">All</option>
          {filterOptions.positions.map(pos => <option key={pos}>{pos}</option>)}
        </select>
      </div>

      <div className="filter-section">
        <strong>Location</strong>
        <select value={tempLocation} onChange={e => setTempLocation(e.target.value)}>
          <option value="">All</option>
          {filterOptions.locations.map(loc => <option key={loc}>{loc}</option>)}
        </select>
      </div>

      <button className="apply-btn" onClick={handleApply}>Apply Filters</button>
    </div>
  );
};

export default FilterPanel;
