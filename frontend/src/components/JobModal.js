import React, { useState, useEffect } from 'react';
import { AiOutlineClose } from 'react-icons/ai';
import { jobsAPI } from '../services/api';
import './JobModal.css';

function JobModal({ job, onClose, onSave, isFullPage = false }) {
  const [formData, setFormData] = useState({
    companyName: '',
    jobTitle: '',
    jobUrl: '',
    status: 'Applied',
    priority: 'Medium',
    location: '',
    jobType: 'Full-time',
    salary: '',
    notes: '',
    tags: [],
    interviewDate: '',
    deadlineDate: '',
    interviewPrep: '',
  });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [tagInput, setTagInput] = useState('');

  useEffect(() => {
    if (job) {
      setFormData({
        ...job,
        tags: job.tags || [],
      });
    }
  }, [job]);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleAddTag = () => {
    if (tagInput.trim()) {
      setFormData(prev => ({
        ...prev,
        tags: [...prev.tags, tagInput.trim()],
      }));
      setTagInput('');
    }
  };

  const handleRemoveTag = (index) => {
    setFormData(prev => ({
      ...prev,
      tags: prev.tags.filter((_, i) => i !== index),
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError('');

    try {
      const dataToSubmit = {
        ...formData,
        tags: formData.tags.filter(t => t),
      };

      if (job) {
        await jobsAPI.updateJob(job._id, dataToSubmit);
      } else {
        await jobsAPI.createJob(dataToSubmit);
      }

      onSave(dataToSubmit);
    } catch (err) {
      setError(err.response?.data?.error || 'Failed to save job application');
    } finally {
      setLoading(false);
    }
  };

  const content = (
    <div className={`modal-content ${isFullPage ? 'full-page-content' : ''}`}>
      <div className="modal-header">
        <h2>{job ? 'Edit Job Application' : 'Add New Job Application'}</h2>
        {!isFullPage && (
          <button className="close-btn" onClick={onClose}>
            <AiOutlineClose />
          </button>
        )}
      </div>

        {error && <div className="error-message">{error}</div>}

        <form onSubmit={handleSubmit}>
          <div className="form-row">
            <div className="form-group">
              <label>Company Name *</label>
              <input
                type="text"
                name="companyName"
                value={formData.companyName}
                onChange={handleInputChange}
                required
                placeholder="e.g., Google"
              />
            </div>
            <div className="form-group">
              <label>Job Title *</label>
              <input
                type="text"
                name="jobTitle"
                value={formData.jobTitle}
                onChange={handleInputChange}
                required
                placeholder="e.g., Software Engineer"
              />
            </div>
          </div>

          <div className="form-group">
            <label>Job URL</label>
            <input
              type="url"
              name="jobUrl"
              value={formData.jobUrl}
              onChange={handleInputChange}
              placeholder="https://..."
            />
          </div>

          <div className="form-row">
            <div className="form-group">
              <label>Status *</label>
              <select
                name="status"
                value={formData.status}
                onChange={handleInputChange}
              >
                <option>Applied</option>
                <option>Interview</option>
                <option>Offer</option>
                <option>Rejected</option>
              </select>
            </div>
            <div className="form-group">
              <label>Priority</label>
              <select
                name="priority"
                value={formData.priority}
                onChange={handleInputChange}
              >
                <option>Low</option>
                <option>Medium</option>
                <option>High</option>
              </select>
            </div>
          </div>

          <div className="form-row">
            <div className="form-group">
              <label>Job Type</label>
              <select
                name="jobType"
                value={formData.jobType}
                onChange={handleInputChange}
              >
                <option>Full-time</option>
                <option>Part-time</option>
                <option>Internship</option>
                <option>Contract</option>
              </select>
            </div>
            <div className="form-group">
              <label>Location</label>
              <input
                type="text"
                name="location"
                value={formData.location}
                onChange={handleInputChange}
                placeholder="e.g., San Francisco, CA"
              />
            </div>
          </div>

          <div className="form-row">
            <div className="form-group">
              <label>Salary Range</label>
              <input
                type="text"
                name="salary"
                value={formData.salary}
                onChange={handleInputChange}
                placeholder="e.g., $100k - $150k"
              />
            </div>
            <div className="form-group">
              <label>Interview Date</label>
              <input
                type="date"
                name="interviewDate"
                value={formData.interviewDate}
                onChange={handleInputChange}
              />
            </div>
          </div>

          <div className="form-group">
            <label>Tags</label>
            <div className="tag-input-group">
              <input
                type="text"
                value={tagInput}
                onChange={(e) => setTagInput(e.target.value)}
                placeholder="Add a tag (e.g., Remote, Startup)"
                onKeyPress={(e) => {
                  if (e.key === 'Enter') {
                    e.preventDefault();
                    handleAddTag();
                  }
                }}
              />
              <button
                type="button"
                className="btn btn-secondary"
                onClick={handleAddTag}
              >
                Add
              </button>
            </div>
            <div className="tags-display">
              {formData.tags.map((tag, idx) => (
                <span key={idx} className="tag">
                  {tag}
                  <button
                    type="button"
                    className="tag-remove"
                    onClick={() => handleRemoveTag(idx)}
                  >
                    ×
                  </button>
                </span>
              ))}
            </div>
          </div>

          <div className="form-row">
            <div className="form-group">
              <label>Interview Date</label>
              <input
                type="date"
                name="interviewDate"
                value={formData.interviewDate ? formData.interviewDate.split('T')[0] : ''}
                onChange={handleInputChange}
              />
            </div>
            <div className="form-group">
              <label>Application Deadline</label>
              <input
                type="date"
                name="deadlineDate"
                value={formData.deadlineDate ? formData.deadlineDate.split('T')[0] : ''}
                onChange={handleInputChange}
              />
            </div>
          </div>

          <div className="form-group">
            <label>Notes & Follow-up</label>
            <textarea
              name="notes"
              value={formData.notes}
              onChange={handleInputChange}
              placeholder="HR contact, follow-up status, or general notes..."
              rows={3}
            />
          </div>

          <div className="form-group">
            <label>Interview Prep & Questions</label>
            <textarea
              name="interviewPrep"
              value={formData.interviewPrep || ''}
              onChange={handleInputChange}
              placeholder="Key questions to ask, project highlights to mention, etc."
              rows={3}
            />
          </div>

          <div className="modal-footer">
            <button type="button" className="btn btn-secondary" onClick={onClose}>
              Cancel
            </button>
            <button
              type="submit"
              className="btn btn-primary"
              disabled={loading}
            >
              {loading ? 'Saving...' : 'Save Application'}
            </button>
        </form>
      </div>
    </div>
  );

  return isFullPage ? content : (
    <div className="modal-overlay">
      {content}
    </div>
  );
}

export default JobModal;
