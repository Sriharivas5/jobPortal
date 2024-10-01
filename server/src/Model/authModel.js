const mongoose = require("mongoose");

// Defining the schema for the 'auth' collection
const authSchema = mongoose.Schema({
  // Field to store the full name of the user
  fullname: {
    type: String, // Data type of the field
    required: true, // This field is mandatory
  },
  email: {
    type: String,
    required: true,
  },
  password: {
    type: String,
    required: true,
  },
  empType: {
    type: String,
    required: true,
  },
});
// Create and export the Mongoose model based on the 'authSchema'
// 'auth' is the name of the model and will be used to interact with the 'auth' collection in MongoDB
module.exports = mongoose.model("auth", authSchema);
