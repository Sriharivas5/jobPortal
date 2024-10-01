import React from "react";
import Register from "./Pages/Authentication/Register/Register";
import Login from "./Pages/Authentication/Login/Login";
import PostJob from "./Pages/Account/Employer/PostJob/PostJob";
import ViewPostedJobs from "./Pages/Account/Employer/ViewPostedJobs/ViewPostedJobs";
import ViewAllJobs from "./Pages/Account/Employee/ViewAllJobs/ViewAllJobs";
import "./App.css";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import AppliedJobs from "./Pages/Account/Employee/AppliedJobs/AppliedJobs";
function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Register />} />
        <Route path="/login" element={<Login />} />
        <Route path="/postjob" element={<PostJob />} />
        <Route path="/viewpostedjobs" element={<ViewPostedJobs />} />
        <Route path="/alljobs" element={<ViewAllJobs />} />
        <Route path="/appliedjobs" element={<AppliedJobs />} />
      </Routes>
    </Router>
  );
}

export default App;
