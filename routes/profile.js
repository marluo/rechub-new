require("dotenv").config();
const express = require("express");
const multer = require("multer");
const mongoose = require("mongoose");
const router = express.Router();
const decode = require("../middleware/decode");
// decode - decodear användarens jwt med id och role från usern.
const recruiter = require("../middleware/recruiter");
const validateRegister = require("../validation/register");
const User = require("../models/User");
const Recruiter = require("../models/RecruiterSchema");
const Ad = require("../models/Ad");
const Profile = require("../models/Profile");

//  @@ /profile/jobs
// @@ - add a job to a profile
// @@ private - role: recruiter
// TEST: WORKING

router.get("/api/profile/:id/", decode, async (req, res) => {
  try {
    if (!req.params.id.match(/^[0-9a-fA-F]{24}$/)) {
      res.status(400).json({ msg: "no user by that id" });
    }

    //hämta profil från databas, populatea från user-fältet.
    const profile = await Profile.findOne({ user: req.params.id }).populate(
      "user"
    );

    console.log(profile);

    //om profilen inte finns
    if (!profile) {
      console.log(profile);
      return res.status(404).json({ msg: "no user by that id" });
    }
    //skicka profilen tillbaka till klienten.
    res.status(200).send(profile);
  } catch (err) {
    console.log(err.message);
    res
      .status(404)
      .json({ msg: "Something happened... our engineers are working on it" });
  }
});

//@@ route - /profile/jobs
//@@ desc - lägg till ett jobb
//@@ private - role: worker
// TEST - WORKING

router.put("/profile/jobs", decode, async (req, res) => {
  try {
    //destructar objekt
    const { title, company, from, to } = req.body;

    console.log("wwwwwwww", title, company, from, to);

    // hämtar profil och uppdaterar med operators
    const profile = await Profile.findOneAndUpdate(
      { user: req.user },
      {
        //pushar in ett objekt i jobs med operators
        $push: { jobs: { title, company, from, to } }
      },
      { new: true }
    );
    //om användaren inte har en profil
    if (!profile) {
      res.status(500).send("You don't have a profile");
    }
    //skickar tillbaka den nya profilen med jobben adddade
    res.status(200).json(profile.jobs);
  } catch (err) {
    console.error(err);
  }
});

//  @@ /profile/eucation
// @@ - add a job to a profile
// @@ private - role: worker

router.put("/profile/education", decode, async (req, res) => {
  try {
    //destructar objekt
    const { school, fieldofstudy, degree, from, to } = req.body;

    console.log(school, fieldofstudy, degree, from, to);

    // hämtar profil och uppdaterar med mongodb operator (array push)
    const profile = await Profile.findOneAndUpdate(
      { user: req.user },
      {
        //pushar in ett objekt i jobs med mongodb operator (array push)
        $push: { education: { school, fieldofstudy, degree, from, to } }
      },
      { new: true }
    );
    //om användaren inte har en profil
    if (!profile) {
      res.status(500).send("You don't have a profile");
    }
    //skickar tillbaka den nya profilen med jobben adddade
    res.status(200).json(profile.education);
  } catch (err) {
    console.error(err);
  }
});

// @@ - POST /profile
// @@ - skapar upp en profil, eller uppdaterar den.
// @@ - Private
// WORKING

router.post("/profile/worker", decode, async (req, res) => {
  const { profileTitle, currentStatus, phoneNumber } = req.body;
  console.log(profileTitle);

  try {
    //tar ut profilen ur databasen
    let profile = await Profile.findOne({ user: req.user });
    console.log(profile);

    //om profilen inte finns
    if (profile) {
      profile = await Profile.findOneAndUpdate(
        {
          //hitta sin egna profil
          user: req.user
        },
        //mongoOperator för att uppdatera fälten/skriva över dem
        {
          $set: { profileTitle }
        },
        { new: true }
      );
      return res.json(profile);
    }

    const newProfile = new Profile({
      user: req.user,
      profileTitle,
      currentStatus,
      phoneNumber
    });

    await newProfile.save();

    res.json(newProfile);
  } catch (error) {
    console.error(error.message);
  }
});

//@@Skapa upp en recruiterprofil
//@@ ANVÄNDS FÖR INTE SÅ MKT?

router.post("/profile/recruiter", decode, async (req, res) => {
  const { title, company, contact } = req.body;

  const newRecruiter = new Recruiter({
    title,
    "company.name": company.name,
    "contact.phone": contact.phone,
    "contact.email": contact.email
  });

  await Recruiter.save();
});

router.post("/profile/recruiter", decode, async (req, res) => {
  const { title, company, contact } = req.body;

  const newRecruiter = new Recruiter({
    title,
    "company.name": company.name,
    "contact.phone": contact.phone,
    "contact.email": contact.email
  });

  await Recruiter.save();
});

router.put("/api/profile/bioo", decode, async (req, res) => {
  const { bio } = req.body;

  try {
    const profile = await Profile.findOneAndUpdate(
      {
        //hitta sin egna profil
        user: req.user
      },
      //mongoOperator för att uppdatera fälten/skriva över dem
      {
        $set: { profileBio: bio }
      },
      { new: true }
    ).populate("user");

    res.json(profile);
  } catch (err) {
    console.log(err.message);
  }
});

const upload = multer({
  limits: {
    filesize: 100000000000
  },
  fileFilter(req, file, cb) {
    if (!file.originalname.match(/\.(jpg|jpeg)$/)) {
      return cb(new Error("Please upload a jpg/jpeg file!"));
    }
    cb(undefined, true);
  }
});

router.post(
  "/upload",
  decode,
  upload.single("avatar"),
  async (req, res) => {
    console.log("testing", req.user);
    //hitta användaren
    const profile = await Profile.findOneAndUpdate(
      { user: req.user },
      {
        $set: { profilePic: req.file.buffer }
      },
      { new: true }
    );

    return res.status(200).json(profile.profilePic);
  },
  //om vi får error
  (error, req, res, next) => {
    res.status(400).send({ error: error.message });
  }
);

module.exports = router;
