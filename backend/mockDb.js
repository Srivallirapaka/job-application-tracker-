const fs = require('fs');
const path = require('path');

const MOCK_FILE = path.join(__dirname, 'mock_db.json');

// Initial state
let data = {
  users: [],
  jobs: []
};

// Load from file if exists
if (fs.existsSync(MOCK_FILE)) {
  try {
    data = JSON.parse(fs.readFileSync(MOCK_FILE));
  } catch (e) {
    console.error('Error loading mock DB:', e);
  }
}

const save = () => {
  fs.writeFileSync(MOCK_FILE, JSON.stringify(data, null, 2));
};

const MockDB = {
  users: {
    findOne: async (query) => {
      if (query.$or) {
        return data.users.find(u => u.email === query.$or[0].email || u.username === query.$or[1].username);
      }
      if (query.email) {
        const user = data.users.find(u => u.email === query.email);
        if (user) {
          return { ...user, select: () => user, matchPassword: async (p) => p === user.password };
        }
      }
      return null;
    },
    findById: async (id) => data.users.find(u => u._id === id),
    create: async (userData) => {
      const newUser = { ...userData, _id: Date.now().toString() };
      data.users.push(newUser);
      save();
      return newUser;
    }
  },
  jobs: {
    find: async (query) => data.jobs.filter(j => j.userId === query.userId),
    findById: async (id) => data.jobs.find(j => j._id === id),
    create: async (jobData) => {
      const newJob = { ...jobData, _id: Date.now().toString(), createdAt: new Date().toISOString() };
      data.jobs.push(newJob);
      save();
      return newJob;
    },
    findByIdAndUpdate: async (id, update) => {
      const index = data.jobs.findIndex(j => j._id === id);
      if (index !== -1) {
        data.jobs[index] = { ...data.jobs[index], ...update };
        save();
        return data.jobs[index];
      }
      return null;
    },
    findByIdAndDelete: async (id) => {
      const index = data.jobs.findIndex(j => j._id === id);
      if (index !== -1) {
        const job = data.jobs.splice(index, 1)[0];
        save();
        return job;
      }
      return null;
    }
  }
};

module.exports = MockDB;
