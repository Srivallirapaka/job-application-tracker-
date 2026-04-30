import React from 'react';
import { AiOutlineSearch } from 'react-icons/ai';
import './FilterBar.css';

function FilterBar({ filters, setFilters }) {
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFilters(prev => ({ ...prev, [name]: value }));
  };

  return (
    <div className="filter-section">
      <div className="filter-main-row">
        <div className="search-wrapper">
          <AiOutlineSearch className="search-icon-small" />
          <input
            type="text"
            name="search"
            className="search-input-refined"
            placeholder="Search by company or role..."
            value={filters.search}
            onChange={handleChange}
          />
        </div>

        <div className="filter-controls-refined">
          <select name="priority" value={filters.priority} onChange={handleChange}>
            <option value="">Priority: All</option>
            <option value="High">High</option>
            <option value="Medium">Medium</option>
            <option value="Low">Low</option>
          </select>
          
          <select name="status" value={filters.status} onChange={handleChange}>
            <option value="">Status: All</option>
            <option value="Applied">Applied</option>
            <option value="Interview">Interview</option>
            <option value="Offer">Offer</option>
            <option value="Rejected">Rejected</option>
          </select>

          <button 
            className="btn-reset-refined"
            onClick={() => setFilters({ search: '', priority: '', status: '', locationType: '' })}
            title="Reset All Filters"
          >
            Reset
          </button>
        </div>
      </div>
    </div>
  );
}

export default FilterBar;
