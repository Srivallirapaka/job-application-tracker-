import React from 'react';
import { AiOutlineDelete, AiOutlineEdit } from 'react-icons/ai';
import './JobCard.css';

function JobCard({ job, onClick, onDelete, isDragging }) {
  const formatDate = (dateString) => {
    if (!dateString) return 'No date added';
    const date = new Date(dateString);
    if (isNaN(date.getTime())) return 'No date added';
    const options = { year: 'numeric', month: 'short', day: 'numeric' };
    return date.toLocaleDateString('en-US', options);
  };

  const getDaysSinceApplied = (dateString) => {
    if (!dateString) return null;
    const date = new Date(dateString);
    if (isNaN(date.getTime())) return null;
    const diffTime = Math.abs(new Date() - date);
    const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
    return diffDays;
  };

  const isInterviewTomorrow = (interviewDate) => {
    if (!interviewDate) return false;
    const date = new Date(interviewDate);
    if (isNaN(date.getTime())) return false;
    const tomorrow = new Date();
    tomorrow.setDate(tomorrow.getDate() + 1);
    return date.toDateString() === tomorrow.toDateString() || date.toDateString() === new Date().toDateString();
  };

  const getCompanyInitial = (name) => {
    return name ? name.charAt(0).toUpperCase() : '?';
  };

  const daysSince = getDaysSinceApplied(job.createdAt || job.dateApplied);
  const urgent = isInterviewTomorrow(job.interviewDate);

  const getPriorityColor = (priority) => {
    switch (priority) {
      case 'High':
        return '#f44336';
      case 'Medium':
        return '#ff9800';
      case 'Low':
        return '#4caf50';
      default:
        return '#999';
    }
  };

  return (
    <div className={`job-card ${isDragging ? 'dragging' : ''} ${urgent ? 'urgent-card' : ''}`} onClick={onClick}>
      {urgent && <div className="urgent-badge">⚠️ Interview Soon</div>}
      <div className="card-header">
        <div className="title-section">
          <div className="company-logo">
            {getCompanyInitial(job.companyName)}
          </div>
          <div className="title-info">
            <h4 className="card-title">{job.jobTitle}</h4>
            <p className="card-company">{job.companyName}</p>
          </div>
        </div>
        <div className="card-actions">
          <button
            className="action-btn edit-btn"
            onClick={(e) => {
              e.stopPropagation();
              onClick();
            }}
            title="Edit"
          >
            <AiOutlineEdit />
          </button>
          <button
            className="action-btn delete-btn"
            onClick={(e) => {
              e.stopPropagation();
              onDelete();
            }}
            title="Delete"
          >
            <AiOutlineDelete />
          </button>
        </div>
      </div>

      <div className="card-details">
        <div className="meta-row">
          {job.location && <span className="card-meta">📍 {job.location}</span>}
          {job.jobType && <span className="card-meta">💼 {job.jobType}</span>}
        </div>
        {daysSince !== null && (
          <span className="card-meta days-count">
            🕒 {daysSince} {daysSince === 1 ? 'day' : 'days'} ago
          </span>
        )}
      </div>

      <div className="card-footer">
        <span
          className="priority-badge"
          style={{ backgroundColor: getPriorityColor(job.priority) }}
        >
          {job.priority}
        </span>
        <span className="date-badge">
          📅 {formatDate(job.createdAt || job.dateApplied)}
        </span>
      </div>

      {job.tags && job.tags.length > 0 && (
        <div className="tags">
          {job.tags.slice(0, 2).map((tag, idx) => (
            <span key={idx} className="tag">
              {tag}
            </span>
          ))}
          {job.tags.length > 2 && <span className="tag-more">+{job.tags.length - 2}</span>}
        </div>
      )}
    </div>
  );
}

export default JobCard;
