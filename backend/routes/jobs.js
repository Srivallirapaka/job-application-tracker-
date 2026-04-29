const express = require('express');
const { body, validationResult } = require('express-validator');
const JobApplication = require('../models/JobApplication');
const { authenticateToken } = require('../middleware/auth');
const MockDB = require('../mockDb');
const mongoose = require('mongoose');

const router = express.Router();

const getDB = () => {
  return mongoose.connection.readyState === 1 ? JobApplication : MockDB.jobs;
};

// Middleware to authenticate all routes
router.use(authenticateToken);

// Create job application
router.post(
  '/',
  [
    body('companyName').notEmpty().withMessage('Company name is required'),
    body('jobTitle').notEmpty().withMessage('Job title is required'),
    body('status')
      .isIn(['Applied', 'Interview', 'Offer', 'Rejected'])
      .withMessage('Invalid status'),
  ],
  async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }

    try {
      const jobData = {
        ...req.body,
        userId: req.userId,
      };

      let jobApplication;
      if (mongoose.connection.readyState === 1) {
        jobApplication = new JobApplication({ ...jobData, user: req.userId });
        await jobApplication.save();
      } else {
        jobApplication = await MockDB.jobs.create(jobData);
        console.log('Job created using MockDB (MongoDB disconnected)');
      }

      res.status(201).json({
        message: 'Job application created successfully',
        data: jobApplication,
      });
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  }
);

// Get all job applications for current user
router.get('/', async (req, res) => {
  try {
    const { status, sortBy = 'dateApplied' } = req.query;
    const db = getDB();
    const filter = { userId: req.userId };

    if (status) {
      filter.status = status;
    }

    let jobApplications;
    if (mongoose.connection.readyState === 1) {
      jobApplications = await JobApplication.find({ user: req.userId, ...filter })
        .sort({ [sortBy]: -1 })
        .populate('user', 'username email');
    } else {
      jobApplications = await db.find(filter);
    }

    res.json({
      count: jobApplications.length,
      data: jobApplications,
    });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// Get single job application
router.get('/:id', async (req, res) => {
  try {
    const jobApplication = await JobApplication.findOne({
      _id: req.params.id,
      user: req.userId,
    }).populate('user', 'username email');

    if (!jobApplication) {
      return res.status(404).json({ error: 'Job application not found' });
    }

    res.json(jobApplication);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// Update job application
router.put('/:id', async (req, res) => {
  try {
    const { status } = req.body;
    const db = getDB();

    // Validate status if provided
    if (status && !['Applied', 'Interview', 'Offer', 'Rejected'].includes(status)) {
      return res.status(400).json({ error: 'Invalid status' });
    }

    let jobApplication;
    if (mongoose.connection.readyState === 1) {
      jobApplication = await JobApplication.findOneAndUpdate(
        { _id: req.params.id, user: req.userId },
        req.body,
        { new: true, runValidators: true }
      );
    } else {
      jobApplication = await db.findByIdAndUpdate(req.params.id, req.body);
    }

    if (!jobApplication) {
      return res.status(404).json({ error: 'Job application not found' });
    }

    res.json({
      message: 'Job application updated successfully',
      data: jobApplication,
    });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// Delete job application
router.delete('/:id', async (req, res) => {
  try {
    const jobApplication = await JobApplication.findOneAndDelete({
      _id: req.params.id,
      user: req.userId,
    });

    if (!jobApplication) {
      return res.status(404).json({ error: 'Job application not found' });
    }

    res.json({ message: 'Job application deleted successfully' });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// Get statistics for dashboard
router.get('/stats/summary', async (req, res) => {
  try {
    let stats;
    if (mongoose.connection.readyState === 1) {
      stats = await JobApplication.aggregate([
        { $match: { user: new (require('mongoose')).Types.ObjectId(req.userId) } },
        {
          $group: {
            _id: '$status',
            count: { $sum: 1 },
          },
        },
      ]);
    } else {
      stats = []; // Empty stats for mock mode for now
    }

    res.json(stats);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

module.exports = router;
