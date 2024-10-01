const mongoose = require("mongoose");
mongoose
  .connect("mongodb://localhost:27017/jobportal")
  .then(() => {
    console.log("database connected succefully");
  })
  .catch((err) => console.log(err));
