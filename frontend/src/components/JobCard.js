import React from 'react';
import { AiOutlineDelete, AiOutlineEdit, AiOutlineArrowRight, AiOutlineCloseCircle, AiOutlineCheckCircle } from 'react-icons/ai';
import './JobCard.css';

function JobCard({ job, onClick, onDelete, onUpdateStatus, isDragging }) {
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
      
      <div className="title-section">
        <div className="title-main">
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
            className="action-btn"
            onClick={(e) => { e.stopPropagation(); onClick(); }}
            title="Edit"
          >
            <AiOutlineEdit />
          </button>
          <button
            className="action-btn delete-btn"
            onClick={(e) => { e.stopPropagation(); onDelete(); }}
            title="Delete"
          >
            <AiOutlineDelete />
          </button>
        </div>
      </div>

      <div className="card-meta-row">
        {job.location && <span className="meta-item">📍 {job.location}</span>}
        {job.jobType && <span className="meta-item">💼 {job.jobType}</span>}
        {daysSince !== null && (
          <span className="meta-item">
            🕒 {daysSince}d ago
          </span>
        )}
      </div>

      <div className="status-quick-actions">
        {job.status === 'Applied' && (
          <button 
            className="quick-status-btn interview"
            onClick={(e) => { e.stopPropagation(); onUpdateStatus(job._id, 'Interview'); }}
          >
            Interview
          </button>
        )}
        {job.status === 'Interview' && (
          <button 
            className="quick-status-btn offer"
            onClick={(e) => { e.stopPropagation(); onUpdateStatus(job._id, 'Offer'); }}
          >
            Offer
          </button>
        )}
        {(job.status === 'Applied' || job.status === 'Interview') && (
          <button 
            className="quick-status-btn reject"
            onClick={(e) => { e.stopPropagation(); onUpdateStatus(job._id, 'Rejected'); }}
          >
            Reject
          </button>
        )}
      </div>

      <div className="card-footer">
        <span className={`priority-badge priority-${job.priority?.toLowerCase() || 'low'}`}>
          {job.priority}
        </span>
        <span className="date-text">
          {formatDate(job.createdAt || job.dateApplied)}
        </span>
      </div>

      {job.tags && job.tags.length > 0 && (
        <div className="tags">
          {job.tags.slice(0, 2).map((tag, idx) => (
            <span key={idx} className="tag">{tag}</span>
          ))}
          {job.tags.length > 2 && <span className="tag-more">+{job.tags.length - 2}</span>}
        </div>
      )}
    </div>
  );
}

export default JobCard;
