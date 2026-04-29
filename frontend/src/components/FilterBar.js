import React from 'react';
import { AiOutlineSearch, AiOutlineFilter } from 'react-icons/ai';
import './FilterBar.css';

function FilterBar({ filters, setFilters }) {
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFilters(prev => ({ ...prev, [name]: value }));
  };

  return (
    <div className="filter-bar-container">
      <div className="search-wrapper">
        <AiOutlineSearch className="search-icon" />
        <input
          type="text"
          name="search"
          placeholder="Search by company or role..."
          value={filters.search}
          onChange={handleChange}
        />
      </div>

      <div className="filters-group">
        <div className="filter-item">
          <select name="priority" value={filters.priority} onChange={handleChange}>
            <option value="">All Priorities</option>
            <option value="High">High</option>
            <option value="Medium">Medium</option>
            <option value="Low">Low</option>
          </select>
        </div>

        <div className="filter-item">
          <select name="status" value={filters.status} onChange={handleChange}>
            <option value="">All Statuses</option>
            <option value="Applied">Applied</option>
            <option value="Interview">Interview</option>
            <option value="Offer">Offer</option>
            <option value="Rejected">Rejected</option>
          </select>
        </div>

        <div className="filter-item">
          <select name="locationType" value={filters.locationType} onChange={handleChange}>
            <option value="">All Locations</option>
            <option value="Remote">Remote</option>
            <option value="On-site">On-site</option>
            <option value="Hybrid">Hybrid</option>
          </select>
        </div>

        <button 
          className="btn-clear"
          onClick={() => setFilters({ search: '', priority: '', status: '', locationType: '' })}
        >
          Reset
        </button>
      </div>
    </div>
  );
}

export default FilterBar;
