import React from 'react';
import './AnalyticsDashboard.css';

function AnalyticsDashboard({ jobs }) {
  const total = jobs.length;
  const interviewCount = jobs.filter(j => j.status === 'Interview').length;
  const offerCount = jobs.filter(j => j.status === 'Offer').length;
  const rejectedCount = jobs.filter(j => j.status === 'Rejected').length;

  const interviewRate = total > 0 ? ((interviewCount / total) * 100).toFixed(0) : 0;
  const offerRate = interviewCount > 0 ? ((offerCount / interviewCount) * 100).toFixed(0) : 0;

  return (
    <div className="analytics-container">
      <div className="stat-card">
        <span className="stat-label">Total Applications</span>
        <span className="stat-value">{total}</span>
      </div>
      <div className="stat-card highlight-orange">
        <span className="stat-label">Interviews</span>
        <span className="stat-value">{interviewCount}</span>
      </div>
      <div className="stat-card highlight-green">
        <span className="stat-label">Offers Received</span>
        <span className="stat-value">{offerCount}</span>
      </div>
      <div className="stat-card highlight-blue">
        <span className="stat-label">Conv. Rate (Int)</span>
        <span className="stat-value">{interviewRate}%</span>
      </div>
      <div className="stat-card highlight-purple">
        <span className="stat-label">Success Rate</span>
        <span className="stat-value">{offerRate}%</span>
      </div>
    </div>
  );
}

export default AnalyticsDashboard;
