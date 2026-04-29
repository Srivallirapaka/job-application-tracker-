import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  jobs: [],
  filteredJobs: [],
  selectedJob: null,
  loading: false,
  error: null,
  filter: {
    status: null,
    sortBy: 'dateApplied',
  },
};

const jobsSlice = createSlice({
  name: 'jobs',
  initialState,
  reducers: {
    setJobs: (state, action) => {
      state.jobs = action.payload;
      state.filteredJobs = action.payload;
    },
    addJob: (state, action) => {
      state.jobs.push(action.payload);
      state.filteredJobs = state.jobs;
    },
    updateJob: (state, action) => {
      const index = state.jobs.findIndex(job => job._id === action.payload._id);
      if (index !== -1) {
        state.jobs[index] = action.payload;
        state.filteredJobs = state.jobs;
      }
    },
    deleteJob: (state, action) => {
      state.jobs = state.jobs.filter(job => job._id !== action.payload);
      state.filteredJobs = state.jobs;
    },
    setSelectedJob: (state, action) => {
      state.selectedJob = action.payload;
    },
    setLoading: (state, action) => {
      state.loading = action.payload;
    },
    setError: (state, action) => {
      state.error = action.payload;
    },
    setFilter: (state, action) => {
      state.filter = { ...state.filter, ...action.payload };
    },
    filterJobs: (state, action) => {
      const { status } = state.filter;
      if (status) {
        state.filteredJobs = state.jobs.filter(job => job.status === status);
      } else {
        state.filteredJobs = state.jobs;
      }
    },
    moveJobBetweenColumns: (state, action) => {
      const { jobId, newStatus } = action.payload;
      const job = state.jobs.find(j => j._id === jobId);
      if (job) {
        job.status = newStatus;
        state.filteredJobs = state.jobs;
      }
    },
  },
});

export const {
  setJobs,
  addJob,
  updateJob,
  deleteJob,
  setSelectedJob,
  setLoading,
  setError,
  setFilter,
  filterJobs,
  moveJobBetweenColumns,
} = jobsSlice.actions;
export default jobsSlice.reducer;
