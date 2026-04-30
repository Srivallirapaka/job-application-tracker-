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
import BottomNav from '../components/BottomNav';

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

  const [activeTab, setActiveTab] = useState('home');

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

  const handleUpdateStatus = async (jobId, newStatus) => {
    try {
      await jobsAPI.updateJob(jobId, { status: newStatus });
      fetchJobs(); // Refresh to update columns
    } catch (error) {
      console.error('Error updating status:', error);
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
        {activeTab === 'analysis' && <AnalyticsDashboard jobs={jobs} showCharts={true} />}
        
        <div className="dashboard-header-empty"></div>

        {activeTab === 'home' && (
          <>
            <AnalyticsDashboard jobs={jobs} showCharts={false} />
            <div className="search-section-wrapper">
              <FilterBar filters={filters} setFilters={setFilters} />
            </div>
            <div className="board-title-row">
              <h2>My Job Applications</h2>
            </div>
          </>
        )}

        {loading ? (
          <div className="loading">Loading your job applications...</div>
        ) : (
          activeTab === 'home' && (
            <KanbanBoard
              jobs={filteredJobs}
              onDragEnd={handleDragEnd}
              onJobClick={(job) => {
                setSelectedJob(job);
                setShowModal(true);
              }}
              onDeleteJob={handleDeleteJob}
              onUpdateStatus={handleUpdateStatus}
            />
          )
        )}

        {activeTab === 'analysis' && (
          <div className="analysis-view">
            {/* You could add more detailed charts here in the future */}
            <p className="analysis-tip">Tap the stat cards above for more details.</p>
          </div>
        )}

        {activeTab === 'create' && (
          <div className="create-job-page">
            <JobModal
              isFullPage={true}
              job={null}
              onClose={() => setActiveTab('home')}
              onSave={handleAddJob}
            />
          </div>
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

        <BottomNav 
          activeTab={activeTab} 
          setActiveTab={setActiveTab} 
          onAddClick={() => {
            setActiveTab('create');
          }} 
        />
      </div>
    </div>
  );
}

export default Dashboard;
