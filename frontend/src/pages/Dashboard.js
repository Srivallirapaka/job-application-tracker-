import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { setJobs, deleteJob, moveJobBetweenColumns } from '../redux/jobsSlice';
import { logout } from '../redux/authSlice';
import { jobsAPI } from '../services/api';
import Header from '../components/Header';
import KanbanBoard from '../components/KanbanBoard';
import JobModal from '../components/JobModal';
import AnalyticsDashboard from '../components/AnalyticsDashboard';
import FilterBar from '../components/FilterBar';

function Dashboard() {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { jobs } = useSelector(state => state.jobs);
  const { user } = useSelector(state => state.auth);
  const [loading, setLoading] = useState(true);
  const [showModal, setShowModal] = useState(false);
  const [selectedJob, setSelectedJob] = useState(null);
  
  // Filtering state
  const [filters, setFilters] = useState({
    search: '',
    priority: '',
    status: '',
    locationType: ''
  });

  useEffect(() => {
    fetchJobs();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const fetchJobs = async () => {
    try {
      setLoading(true);
      const response = await jobsAPI.getAllJobs();
      dispatch(setJobs(response.data.data));
    } catch (error) {
      console.error('Error fetching jobs:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleLogout = () => {
    dispatch(logout());
    navigate('/login');
  };

  const handleAddJob = (jobData) => {
    setSelectedJob(null);
    setShowModal(false);
    fetchJobs();
  };

  const handleUpdateJob = (jobData) => {
    setSelectedJob(null);
    setShowModal(false);
    fetchJobs();
  };

  const handleDeleteJob = async (jobId) => {
    try {
      await jobsAPI.deleteJob(jobId);
      dispatch(deleteJob(jobId));
      setSelectedJob(null);
    } catch (error) {
      console.error('Error deleting job:', error);
    }
  };

  const handleDragEnd = async (result) => {
    const { source, destination, draggableId } = result;

    if (!destination) return;

    if (
      source.droppableId === destination.droppableId &&
      source.index === destination.index
    ) {
      return;
    }

    const newStatus = destination.droppableId;
    dispatch(moveJobBetweenColumns({ jobId: draggableId, newStatus }));

    try {
      await jobsAPI.updateJob(draggableId, { status: newStatus });
    } catch (error) {
      console.error('Error updating job status:', error);
      fetchJobs();
    }
  };

  // Apply filters
  const filteredJobs = jobs.filter(job => {
    const matchesSearch = 
      job.companyName?.toLowerCase().includes(filters.search.toLowerCase()) ||
      job.jobTitle?.toLowerCase().includes(filters.search.toLowerCase());
    
    const matchesPriority = !filters.priority || job.priority === filters.priority;
    const matchesStatus = !filters.status || job.status === filters.status;
    const matchesLocation = !filters.locationType || job.jobType === filters.locationType;

    return matchesSearch && matchesPriority && matchesStatus && matchesLocation;
  });

  return (
    <div className="dashboard-container">
      <Header user={user} onLogout={handleLogout} />
      <div className="dashboard-content">
        <AnalyticsDashboard jobs={jobs} />
        
        <div className="dashboard-header">
          <h2>My Job Applications</h2>
          <button
            className="btn btn-primary"
            onClick={() => {
              setSelectedJob(null);
              setShowModal(true);
            }}
          >
            + Add Job Application
          </button>
        </div>

        <FilterBar filters={filters} setFilters={setFilters} />

        {loading ? (
          <div className="loading">Loading your job applications...</div>
        ) : (
          <KanbanBoard
            jobs={filteredJobs}
            onDragEnd={handleDragEnd}
            onJobClick={(job) => {
              setSelectedJob(job);
              setShowModal(true);
            }}
            onDeleteJob={handleDeleteJob}
          />
        )}

        {showModal && (
          <JobModal
            job={selectedJob}
            onClose={() => {
              setSelectedJob(null);
              setShowModal(false);
            }}
            onSave={selectedJob ? handleUpdateJob : handleAddJob}
          />
        )}
      </div>
    </div>
  );
}

export default Dashboard;
