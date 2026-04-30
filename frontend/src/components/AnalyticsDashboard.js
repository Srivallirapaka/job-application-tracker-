import React from 'react';
import { 
  PieChart, Pie, Cell, Tooltip, ResponsiveContainer, 
  BarChart, Bar, XAxis, YAxis, CartesianGrid, Legend,
  LineChart, Line
} from 'recharts';
import { format, parseISO, startOfDay } from 'date-fns';
import './AnalyticsDashboard.css';

const COLORS = ['#667eea', '#ff9800', '#4caf50', '#f44336', '#9c27b0'];

function AnalyticsDashboard({ jobs, showCharts = true }) {
  const total = jobs.length;
  const interviewCount = jobs.filter(j => j.status === 'Interview').length;
  const offerCount = jobs.filter(j => j.status === 'Offer').length;
  const interviewRate = total > 0 ? ((interviewCount / total) * 100).toFixed(0) : 0;
  const offerRate = interviewCount > 0 ? ((offerCount / interviewCount) * 100).toFixed(0) : 0;

  // Data for Status Pie Chart
  const statusData = [
    { name: 'Applied', value: jobs.filter(j => j.status === 'Applied').length },
    { name: 'Interview', value: interviewCount },
    { name: 'Offer', value: offerCount },
    { name: 'Rejected', value: jobs.filter(j => j.status === 'Rejected').length },
  ].filter(d => d.value > 0);

  // Data for Priority Bar Chart
  const priorityData = [
    { name: 'High', count: jobs.filter(j => j.priority === 'High').length },
    { name: 'Medium', count: jobs.filter(j => j.priority === 'Medium').length },
    { name: 'Low', count: jobs.filter(j => j.priority === 'Low').length },
  ];

  // Data for Trend Line Chart
  const trendMap = jobs.reduce((acc, job) => {
    const date = format(parseISO(job.createdAt || new Date().toISOString()), 'MMM dd');
    acc[date] = (acc[date] || 0) + 1;
    return acc;
  }, {});

  const trendData = Object.keys(trendMap).map(date => ({
    date,
    applications: trendMap[date]
  })).sort((a, b) => new Date(a.date) - new Date(b.date));

  return (
    <div className="analytics-page">
      <div className="analytics-container">
        <div className="stat-card blue">
          <span className="stat-label">Total Applications</span>
          <span className="stat-value">{total}</span>
        </div>
        <div className="stat-card orange">
          <span className="stat-label">Interviews</span>
          <span className="stat-value">{interviewCount}</span>
        </div>
        <div className="stat-card green">
          <span className="stat-label">Offers Received</span>
          <span className="stat-value">{offerCount}</span>
        </div>
        <div className="stat-card purple">
          <span className="stat-label">Success Rate</span>
          <span className="stat-value">{offerRate}%</span>
        </div>
      </div>

      {showCharts && (
        <div className="charts-grid">
          <div className="chart-card">
            <h3>Application Status</h3>
            <div className="chart-container">
              <ResponsiveContainer width="100%" height={300}>
                <PieChart>
                  <Pie
                    data={statusData}
                    cx="50%"
                    cy="50%"
                    innerRadius={60}
                    outerRadius={80}
                    paddingAngle={5}
                    dataKey="value"
                  >
                    {statusData.map((entry, index) => (
                      <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                    ))}
                  </Pie>
                  <Tooltip />
                  <Legend />
                </PieChart>
              </ResponsiveContainer>
            </div>
          </div>

          <div className="chart-card">
            <h3>Priority Distribution</h3>
            <div className="chart-container">
              <ResponsiveContainer width="100%" height={300}>
                <BarChart data={priorityData}>
                  <CartesianGrid strokeDasharray="3 3" vertical={false} />
                  <XAxis dataKey="name" />
                  <YAxis allowDecimals={false} />
                  <Tooltip />
                  <Bar dataKey="count" fill="#667eea" radius={[4, 4, 0, 0]} />
                </BarChart>
              </ResponsiveContainer>
            </div>
          </div>

          <div className="chart-card full-width">
            <h3>Application Trend</h3>
            <div className="chart-container">
              <ResponsiveContainer width="100%" height={300}>
                <LineChart data={trendData}>
                  <CartesianGrid strokeDasharray="3 3" vertical={false} />
                  <XAxis dataKey="date" />
                  <YAxis allowDecimals={false} />
                  <Tooltip />
                  <Line type="monotone" dataKey="applications" stroke="#667eea" strokeWidth={3} dot={{ r: 6 }} activeDot={{ r: 8 }} />
                </LineChart>
              </ResponsiveContainer>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

export default AnalyticsDashboard;
