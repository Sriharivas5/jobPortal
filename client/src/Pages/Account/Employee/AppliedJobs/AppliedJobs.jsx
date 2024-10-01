import React, { useEffect, useState } from "react";
import axios from "axios";
import "./AppliedJobs.scss";
import { Link } from "react-router-dom";

const AppliedJobs = () => {
  const [jobs, setJobs] = useState([]);
  useEffect(() => {
    axios
      .get("http://localhost:3000/api/appliedjobs")
      .then((res) => setJobs(res.data));
  }, []);

  console.log(jobs);
  const filteredJobs = jobs.filter(
    (job) => job.employeeId == sessionStorage.getItem("Id")
  );

  console.log(filteredJobs);
  return (
    <div className="appliedJobs">
      <h1>Applied Jobs</h1>

      <div className="jobsContainer">
        {filteredJobs.map((item) => {
          return (
            <div className="jobs">
              <h2>{item.jobTitle}</h2>
              <p>{item.jobDescription}</p>
            </div>
          );
        })}
      </div>

      <Link to="/alljobs">
        <button>Back To Home</button>
      </Link>
    </div>
  );
};

export default AppliedJobs;
