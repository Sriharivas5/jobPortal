const mongoose = require("mongoose");

const URL =
  "mongodb+srv://sriharivas5:eKdIiR2TnJh5MbCM@jobportal.eaweb.mongodb.net/?retryWrites=true&w=majority&appName=JobPortal";
mongoose
  .connect(URL)
  .then(() => {
    console.log("database connected succefully");
  })
  .catch((err) => console.log(err));
