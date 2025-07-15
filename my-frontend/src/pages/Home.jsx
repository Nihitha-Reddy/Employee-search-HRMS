import React, { useState, useEffect } from 'react';
import axios from 'axios';
import EmployeeTable from '../components/EmployeeTable';
import AddEmployeeModal from '../components/AddEmployeeModal';
import FilterPanel from '../components/FilterPanel';
import ConfigPanel from '../components/ConfigPanel';
import Pagination from '../components/Pagination';

function Home() {
  const [employees, setEmployees] = useState([]);
  const [search, setSearch] = useState('');
  const [appliedFilters, setAppliedFilters] = useState({
    status: [],
    department: '',
    position: '',
    location: ''
  });

  const [page, setPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [totalRecords, setTotalRecords] = useState(0);
  const pageSize = 50;

  const [showFilters, setShowFilters] = useState(false);
  const [showConfig, setShowConfig] = useState(false);
  const [showAddModal, setShowAddModal] = useState(false);

  const [filterOptions, setFilterOptions] = useState({
    departments: [],
    positions: [],
    locations: []
  });

  const [columnsConfig, setColumnsConfig] = useState([
    { key: 'first_name', label: 'First Name', visible: true },
    { key: 'last_name', label: 'Last Name', visible: true },
    { key: 'contact_email', label: 'Contact Info', visible: true },
    { key: 'department', label: 'Department', visible: true },
    { key: 'position', label: 'Position', visible: true },
    { key: 'location', label: 'Location', visible: true },
    { key: 'status', label: 'Status', visible: true },
  ]);

  const loadEmployees = async () => {
    const visibleColumns = columnsConfig
      .filter(col => col.visible)
      .map(col => col.key);

    if (!visibleColumns.length) {
      console.warn("No visible columns — aborting");
      setEmployees([]);
      setTotalRecords(0);
      setTotalPages(1);
      return;
    }

    try {
      const res = await axios.get('http://localhost:8000/employees', {
        params: {
          search,
          visibleColumns: visibleColumns.join(','),
          status: appliedFilters.status.join(','),
          department: appliedFilters.department,
          position: appliedFilters.position,
          location: appliedFilters.location,
          offset: (page - 1) * pageSize,
          limit: pageSize
        }
      });

      const data = res.data;
      const items = data.items || [];
      const total = data.total || 0;

      setEmployees(items);
      setTotalRecords(total);
      setTotalPages(Math.max(1, Math.ceil(total / pageSize)));
    } catch (err) {
      console.error(err);
      setEmployees([]);
      setTotalRecords(0);
      setTotalPages(1);
    }
  };

  const loadFilters = async () => {
    try {
      const res = await axios.get('http://localhost:8000/employees/filters');
      setFilterOptions(res.data || {});
    } catch (err) {
      console.error(err);
    }
  };

  // Load employees when any relevant state changes
  useEffect(() => {
    loadEmployees();
  }, [appliedFilters, search, page, columnsConfig]);

  useEffect(() => {
    loadFilters();
  }, []);

  const handleAdd = async (newEmployee) => {
    try {
      await axios.post('http://localhost:8000/employees', newEmployee);
      loadEmployees();
      setShowAddModal(false);
    } catch (err) {
      console.error(err);
    }
  };

  const handleApplyFilters = (newFilters) => {
    setAppliedFilters(newFilters);
    setShowFilters(false);
    setPage(1); // reset page on filter change
  };

  const handleSaveColumnsConfig = (newConfig) => {
    if (!newConfig.some(c => c.visible)) {
      alert("At least one column must be visible.");
      return;
    }
    setColumnsConfig(newConfig);
    setShowConfig(false);
  };

  return (
    <div className="container">
      <div className="top-bar">
        <button className="add-employee-btn" onClick={() => setShowAddModal(true)}>
          + Add Employee
        </button>

        <div className="search-container">
          <input
            type="text"
            placeholder="Search…"
            value={search}
            onChange={(e) => {
              setSearch(e.target.value);
              setPage(1); // ✅ reset page on search change
            }}
          />
        </div>

        <div className="icons">
          <button title="Filters" onClick={() => setShowFilters(true)}>🔽</button>
          <button title="Configure Columns" onClick={() => setShowConfig(true)}>⚙️</button>
        </div>
      </div>

      {showAddModal && (
        <AddEmployeeModal
          onAdd={handleAdd}
          onClose={() => setShowAddModal(false)}
        />
      )}

      {showFilters && (
        <FilterPanel
          onClose={() => setShowFilters(false)}
          onApply={handleApplyFilters}
          filterOptions={filterOptions}
          currentFilters={appliedFilters}
        />
      )}

      {showConfig && (
        <ConfigPanel
          onClose={() => setShowConfig(false)}
          columnsConfig={columnsConfig}
          onSave={handleSaveColumnsConfig}
        />
      )}

      <EmployeeTable employees={employees} columnsConfig={columnsConfig} />

      <Pagination
        currentPage={page}
        totalPages={totalPages}
        totalRecords={totalRecords}
        pageSize={pageSize}
        onPageChange={(p) => setPage(p)}
      />
    </div>
  );
}

export default Home;
