// Import the Job model from employeeModel
const Job = require("../Model/employeeModel");

// Controller function to apply for a job
exports.applyJob = async (req, res) => {
  try {
    // Destructure required fields from the request body
    const {
      name, // Name of the applicant
      exp, // Experience of the applicant
      employeeId, // Employee ID of the applicant
      jobTitle, // Title of the job being applied for
      jobDescription, // Description of the job being applied for
      employerId, // ID of the employer offering the job
    } = req.body;

    // Create a new job entry using the Job model with the provided data
    const job = new Job({
      name,
      exp,
      employeeId,
      jobTitle,
      jobDescription,
      employerId,
    });

    // Save the job application to the database
    await job.save();

    // Send the saved job as a response
    res.status(201).send(job); // Return 201 status code for successful creation
  } catch (error) {
    // Handle any errors and send a response with a 500 status code
    res.status(500).json({
      message: "Failed to apply for the job",
      error: error.message,
    });
  }
};

// Controller function to retrieve all applied jobs
exports.aplliedJobs = async (req, res) => {
  try {
    // Find and return all job applications stored in the database
    const jobs = await Job.find();

    // Send the list of jobs in JSON format as a response
    res.status(200).json(jobs); // Return 200 status code for successful retrieval
  } catch (error) {
    // Handle any errors and send a response with a 500 status code
    res.status(500).json({
      message: "Failed to retrieve applied jobs",
      error: error.message,
    });
  }
};
