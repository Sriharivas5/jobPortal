const otpModel = require("../Model/otpModel"); // Import OTP model
const authModel = require("../Model/authModel"); // Import Auth model
const crypto = require("crypto"); // For generating random OTP
const nodemailer = require("nodemailer"); // For sending emails

const transporter = nodemailer.createTransport({
  service: "gmail",
  auth: {
    user: "ravikumarmenthula@gmail.com",
    pass: "eyln ssax buxj kesc",
  },
});

exports.sendOtp = async (usertype, email, crdate, req) => {
  try {
    if (!email) {
      return null;
    }

    // Fetch employee based on email
    const employee = await authModel.findOne({
      email: email,
      empType: usertype,
    });

    if (!employee) {
      throw new Error("Employee not found");
    }

    const empid = employee._id;

    // Fetch existing OTP data based on usertype and employee ID
    const otpexist = await otpModel.findOne({ email: email });

    const tenMinutesInMs = 10 * 60 * 1000; // 10 minutes in milliseconds

    // If OTP exists in the table
    if (otpexist) {
      const otp_table = otpexist.otp;
      const time_table = new Date(otpexist.date).getTime(); // Time stored in UTC

      const currentTime = new Date().getTime(); // Current UTC time
      const time_diff = Math.abs(currentTime - time_table);

      console.log("Stored time (UTC):", otpexist.date);
      console.log("Converted time_table (ms):", time_table);
      console.log("Current time (ms):", currentTime);
      console.log("Time difference (ms):", time_diff);

      // If the time difference is less than or equal to 10 minutes, reuse the OTP
      if (time_diff <= tenMinutesInMs && time_diff >= 0) {
        const otp = otp_table; // Reuse existing OTP
        const mailOptions = {
          from: "ravikumarmenthula@gmail.com",
          to: email,
          subject: "Your OTP Code",
          text: `Your OTP code is: ${otp}`,
        };

        const info = await transporter.sendMail(mailOptions);
        console.log("Email sent: " + info.response);

        return { otp, currentTime: new Date() };
      }
    }

    // If more than 10 minutes have passed or no OTP exists, generate a new OTP
    const otp = crypto.randomInt(100000, 999999).toString();
    const mailOptions = {
      from: "ravikumarmenthula@gmail.com",
      to: email,
      subject: "Your OTP Code",
      text: `Your OTP code is: ${otp}`,
    };

    const info = await transporter.sendMail(mailOptions);
    console.log("Email sent: " + info.response);

    // Insert or update the new OTP into the database
    await otpModel.updateOne(
      { email: email }, // Match based on email
      { otp: otp, date: crdate }, // Update OTP and timestamp
      { upsert: true } // Insert if it doesn't exist
    );

    return { otp, currentTime: new Date() };
  } catch (error) {
    console.error("Failed to send OTP", error);
    return null;
  }
};

exports.resendOtp = async (req, res) => {
  try {
    const data = req.body;
    let otpData = await sendOtp(data);
    res.status(201).send(otpData);
  } catch (error) {
    console.log(error);
  }
};

// (module.exports = sendOtp,resendOtp);
