import React, { useEffect, useState } from "react";
import axios from "axios";
import { Link } from "react-router-dom";
import heroBg from "../../../../assets/employeeBg1.jpg";
import "./ViewJobs.scss";
function ViewAllJobs() {
  const [jobs, setJobs] = useState([]);
  const [display, setDisplay] = useState(false);
  const [empName, setEmpName] = useState("");
  const [empExp, setEmpExp] = useState("");

  const [title, setTitle] = useState("title");
  const [id, setId] = useState("");
  const [description, setDescription] = useState("");
  const [employerid, setEmployerId] = useState("");
  const [selectedJobId, setSelectedJobId] = useState(null);
  useEffect(() => {
    axios
      .get("http://localhost:3000/api/getJobs")
      .then((res) => setJobs(res.data));
  }, []);

  const handlePopUp = async (id, title, desc, empid) => {
    setDisplay(true);
    setId(id);
    setTitle(title);
    setDescription(desc);
    setSelectedJobId(id);
    setEmployerId(empid);
  };
  const empId = sessionStorage.getItem("Id");
  // const employerid = jobs[0].employerId;

  console.log(jobs);
  // console.log(jobs[0].employerId);

  const handleApply = async () => {
    if (empName == "" || empExp == "") {
      alert("please fill all the fileds");
    } else {
      axios
        .post("http://localhost:3000/api/applyjob", {
          name: empName,
          exp: empExp,
          employeeId: empId,
          jobTitle: title,
          jobDescription: description,
          employerId: employerid,
        })
        .then((rs) => {
          console.log(rs.data);
        });
      setDisplay(false);
      setEmpName("");
      setEmpExp("");
    }
  };
  return (
    <div className="container">
      <div className="heroSection">
        <div>
          Descover your job and kick start your career , upskill yourself daily
          to acheive what you want to do.
          <Link to="/appliedjobs">
            <button>View APplied Jobs</button>
          </Link>
        </div>

        <img src={heroBg} />
      </div>

      <div className="viewAllJobs">
        <h1>View All Jobs</h1>
        <div className="cardsContainer">
          {jobs.map((item) => {
            return (
              <div>
                <div className="jobCard">
                  <h2>{item.jobTitle}</h2>
                  <p>{item.jobDescription}</p>
                  <button
                    onClick={() =>
                      handlePopUp(
                        item._id,
                        item.jobTitle,
                        item.jobDescription,
                        item.employerId
                      )
                    }
                  >
                    Apply
                  </button>
                </div>
                {selectedJobId === item._id && display && (
                  <div>
                    <input
                      type="text"
                      value={empName}
                      placeholder="name"
                      onChange={(e) => setEmpName(e.target.value)}
                    />
                    <input
                      type="number"
                      value={empExp}
                      placeholder="experience"
                      onChange={(e) => setEmpExp(e.target.value)}
                    />
                    <button onClick={handleApply}>Apply</button>
                  </div>
                )}
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}

export default ViewAllJobs;
