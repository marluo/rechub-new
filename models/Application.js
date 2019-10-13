const mongoose = require("mongoose");

const ApplicantSchema = new mongoose.Schema({
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "user"
  },
  profile: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "profile"
  },
  ad: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "ad"
  },
  adOwner: {
    type: mongoose.Schema.Types.ObjectId
  },
  whyText: {
    type: String,
    required: true
  },
  differentText: {
    type: String,
    required: true
  },
  yourselfText: {
    type: String,
    required: true
  },
  status: {
    adStatus: {
      type: String,
      default: "responded on yet"
    },
    whyApplication: {
      type: String
    },
    interviewDate: {
      type: Date
    },
    interviewLocation: {
      type: String
    }
  }
});

const Application = mongoose.model("application", ApplicantSchema);
module.exports = Application;
