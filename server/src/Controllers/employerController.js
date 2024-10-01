// Import the Job model from employerModel
const Job = require("../Model/employerModel");

// Controller function to post a new job
exports.postJob = async (req, res) => {
  try {
    // Create a new job entry using the Job model with the provided data
    const job = new Job({
      jobTitle: req.body.jobTitle, // Job title
      jobDescription: req.body.jobDescription, // Job description
      employerId: req.body.employerId, // Employer ID
    });

    // Save the job to the database
    await job.save();

    // Send the saved job as a response with 201 status
    res.status(201).send(job);
  } catch (error) {
    // Handle any errors and send a response with a 500 status code
    res.status(500).json({
      message: "Failed to post the job",
      error: error.message,
    });
  }
};

// Controller function to update an existing job by its ID
exports.updateJob = async (req, res) => {
  try {
    const id = req.params.id; // Job ID from request parameters
    const updates = req.body; // Updated job data from request body

    // Find the job by ID and apply updates, return the updated job
    const updatedJob = await Job.findByIdAndUpdate(id, updates, { new: true });

    // If job is not found, return 404 status
    if (!updatedJob) {
      return res.status(404).json({ message: "Job not found" });
    }

    // Send the updated job as a response
    res.status(200).send(updatedJob);
  } catch (error) {
    // Handle any errors and send a response with a 500 status code
    res.status(500).json({
      message: "Failed to update the job",
      error: error.message,
    });
  }
};

// Controller function to delete a job by its ID
exports.deleteJob = async (req, res) => {
  try {
    const id = req.params.id; // Job ID from request parameters

    // Find the job by ID and delete it
    const deletedJob = await Job.findByIdAndDelete(id);

    // If job is not found, return 404 status
    if (!deletedJob) {
      return res.status(404).json({ message: "Job not found" });
    }

    // Send the deleted job as a response
    res.status(200).send(deletedJob);
  } catch (error) {
    // Handle any errors and send a response with a 500 status code
    res.status(500).json({
      message: "Failed to delete the job",
      error: error.message,
    });
  }
};

// Controller function to retrieve all jobs
exports.getJobs = async (req, res) => {
  try {
    // Find and return all job listings from the database
    const jobs = await Job.find();
    // Send the list of jobs as a response
    res.status(200).send(jobs);
  } catch (error) {
    // Handle any errors and send a response with a 500 status code
    res.status(500).json({
      message: "Failed to retrieve jobs",
      error: error,
    });
  }
};
