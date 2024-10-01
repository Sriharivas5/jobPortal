const express = require("express");
const router = express.Router();
const userControlers = require("../Controllers/authContoller");
const employerController = require("../Controllers/employerController");
const employeeController = require("../Controllers/employeeController");
const { authMiddleWare } = require("../Middlewares/authMiddleware");

const { resendOtp } = require("../Controllers/otpController");
// authentication routes
router.post("/register", userControlers.registerUser);
router.post("/login", userControlers.loginUser);

//employer routes
router.post("/postJobs", employerController.postJob);
router.put("/updateJob/:id", employerController.updateJob);
router.delete("/deleteJob/:id", employerController.deleteJob);

router.get("/getJobs", employerController.getJobs);

//employee routes
router.post("/applyjob", employeeController.applyJob);
router.get("/appliedjobs", employeeController.aplliedJobs);

router.post("/resendOtp", resendOtp);
module.exports = router;
