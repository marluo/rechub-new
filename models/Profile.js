const mongoose = require("mongoose");

const ProfileSchema = new mongoose.Schema({
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "user"
  },
  profileTitle: {
    type: String
  },
  currentStatus: {
    type: String
  },
  profileBio: {
    type: String
  },
  jobs: [
    {
      title: {
        type: String,
        required: true
      },
      company: {
        type: String,
        required: true
      },
      from: {
        type: Date,
        required: true
      },
      to: {
        type: String
      }
    }
  ],
  education: [
    {
      school: {
        type: String,
        required: true
      },
      fieldofstudy: {
        type: String,
        required: true
      },
      degree: {
        type: String,
        required: true
      },
      from: {
        type: Date
      },
      to: {
        type: Date
      }
    }
  ]
});

const Profile = mongoose.model("profile", ProfileSchema);
module.exports = Profile;
