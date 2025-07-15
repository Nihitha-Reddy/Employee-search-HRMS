import React from 'react';

function SearchFilter({
  setSearch,
  setStatus,
  setDepartment,
  setPosition,
  setLocation,
  filterOptions = { departments: [], positions: [], locations: [] },
}) {
  return (
    <div className="search-bar">
      <input
        type="text"
        placeholder="Search…"
        onChange={(e) => setSearch(e.target.value)}
      />

      <select onChange={(e) => setStatus(e.target.value)}>
        <option value="">All Statuses</option>
        <option value="ACTIVE">Active</option>
        <option value="NOT_STARTED">Not Started</option>
        <option value="TERMINATED">Terminated</option>
      </select>

      <select onChange={(e) => setDepartment(e.target.value)}>
        <option value="">All Departments</option>
        {(filterOptions.departments || []).map(dep => (
          <option key={dep} value={dep}>{dep}</option>
        ))}
      </select>

      <select onChange={(e) => setPosition(e.target.value)}>
        <option value="">All Positions</option>
        {(filterOptions.positions || []).map(pos => (
          <option key={pos} value={pos}>{pos}</option>
        ))}
      </select>

      <select onChange={(e) => setLocation(e.target.value)}>
        <option value="">All Locations</option>
        {(filterOptions.locations || []).map(loc => (
          <option key={loc} value={loc}>{loc}</option>
        ))}
      </select>
    </div>
  );
}

export default SearchFilter;
