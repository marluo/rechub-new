const mongoose = require("mongoose");

const AdSchema = new mongoose.Schema({
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "user"
  },
  title: {
    type: String,
    required: true
  },
  position: {
    type: String,
    required: true
  },
  company: {
    type: String
  },
  companyLogo: {
    type: Buffer
  },
  location: {
    type: String,
    required: true
  },
  applyLastDate: {
    type: String,
    default: "Until filled"
  },
  short_description: {
    type: String
  },
  whoAreWe: {
    type: String
  },
  whatLookingFor: {
    type: String
  },
  whatQualifications: {
    type: String
  },
  employment_time: {
    type: String,
    required: true
  },
  start_date: {
    type: Date,
    required: true
  },
  homepage: {
    type: String
  },
  date: {
    type: Date,
    default: Date.now()
  },
  category: {
    type: String
  },
  contact: {
    name: {
      type: String
    },
    phone: {
      type: String
    },
    email: {
      type: String
    }
  },
  applicants: [
    {
      profile: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "profile"
      },
      user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "user"
      },
      applicant: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "application"
      }
    }
  ],
  accepted: {
    type: Number,
    default: 0
  },
  rejected: {
    type: Number,
    default: 0
  }
});

const Ad = mongoose.model("ad", AdSchema);
module.exports = Ad;
