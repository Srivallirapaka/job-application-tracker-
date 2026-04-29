const mongoose = require('mongoose');

const jobApplicationSchema = new mongoose.Schema(
  {
    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User',
      required: true,
    },
    companyName: {
      type: String,
      required: [true, 'Please provide company name'],
      trim: true,
    },
    jobTitle: {
      type: String,
      required: [true, 'Please provide job title'],
      trim: true,
    },
    jobUrl: {
      type: String,
      trim: true,
    },
    status: {
      type: String,
      enum: ['Applied', 'Interview', 'Offer', 'Rejected'],
      default: 'Applied',
    },
    priority: {
      type: String,
      enum: ['Low', 'Medium', 'High'],
      default: 'Medium',
    },
    tags: [
      {
        type: String,
        trim: true,
      },
    ],
    notes: {
      type: String,
      trim: true,
    },
    dateApplied: {
      type: Date,
      default: Date.now,
    },
    interviewDate: {
      type: Date,
    },
    offerDate: {
      type: Date,
    },
    rejectionDate: {
      type: Date,
    },
    salary: {
      type: String,
      trim: true,
    },
    location: {
      type: String,
      trim: true,
    },
    jobType: {
      type: String,
      enum: ['Full-time', 'Part-time', 'Internship', 'Contract'],
      default: 'Full-time',
    },
    attachments: [
      {
        filename: String,
        fileUrl: String,
        uploadedAt: {
          type: Date,
          default: Date.now,
        },
      },
    ],
  },
  { timestamps: true }
);

// Index for better query performance
jobApplicationSchema.index({ user: 1, status: 1 });
jobApplicationSchema.index({ user: 1, dateApplied: -1 });

module.exports = mongoose.model('JobApplication', jobApplicationSchema);
