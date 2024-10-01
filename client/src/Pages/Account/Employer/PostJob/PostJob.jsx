import React, { useState } from "react";
import axios from "axios";
import { Link } from "react-router-dom";
// import "./PostJob.scss";

function PostJob() {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  // const [employerId, setEmployerId] = useState("");

  const handlePost = async () => {
    if (title == "" || description == "") {
      alert("please enter all fields");
    } else {
      const token = sessionStorage.getItem("token");

      const response = await axios.post(
        "http://localhost:3000/api/postJobs",
        {
          jobTitle: title,
          jobDescription: description,
          employerId: sessionStorage.getItem("Id"),
        },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      console.log(response.data);
      setTitle("");
      setDescription("");
    }
  };

  return (
    <div className="login">
      <div className="container">
        <h1>Post A Job</h1>

        <label>
          Job Title
          <input
            type="text"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            placeholder="job role"
          />
        </label>
        <label>
          Job Description
          <input
            type="text"
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            placeholder="description"
          />
        </label>

        <button onClick={handlePost}>Submit</button>
        <Link to="/viewpostedjobs">
          <button>Go To Home Page</button>
        </Link>
      </div>
    </div>
  );
}

export default PostJob;
