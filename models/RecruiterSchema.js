const mongoose = require("mongoose");

const RecruiterSchema = new mongoose.Schema({
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "user"
  },
  title: {
    type: String,
    required: true
  },
  company: {
    name: {
      type: String,
      required: true
    }
  },
  contact: {
    phone: {
      type: String,
      required: true
    },
    email: {
      type: String,
      required: true
    }
  }
});

const Recruiter = mongoose.model("recruiter", RecruiterSchema);
module.exports = Recruiter;
