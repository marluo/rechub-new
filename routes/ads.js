require("dotenv").config();
const express = require("express");
const mongoose = require("mongoose");
const router = express.Router();
const decode = require("../middleware/decode");
// decode - decodear användarens jwt med id och role från usern.
const recruiter = require("../middleware/recruiter");
const validateRegister = require("../validation/register");
const User = require("../models/User");
const Ad = require("../models/Ad");
const multer = require("multer");
const Profile = require("../models/Profile");
const Application = require("../models/Application");

//@@ - POSTA en ny ad
//@@ - postar en ny ad av en rekryterare
//@@ - privat - role:recruiter

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

router.post("/api/ads", upload.single("company"), decode, async (req, res) => {
  const formdata = JSON.parse(req.body.data);
  console.log(formdata);

  const {
    title,
    position,
    company,
    location,
    whoAreWe,
    whatLookingFor,
    whatQualifications,
    employment_time,
    contactPhoneNumber,
    contactEmailAdress,
    contactName,
    category,
    startDate,
    shortDescription,
    lastApplyDate
  } = formdata;
  try {
    const newAd = new Ad({
      user: req.user,
      title,
      lastApplyDate,
      employment_time,
      whoAreWe,
      whatLookingFor,
      whatQualifications,
      position,
      company,
      location,
      category,
      start_date: startDate,
      short_description: shortDescription,
      "contact.email": contactEmailAdress,
      "contact.phone": contactPhoneNumber,
      "contact.name": contactName,
      companyLogo: req.file.buffer
    });
    await newAd.save();

    res.json(newAd);
  } catch (err) {
    console.log(err.message);
    res.status(500).json({ err: err.message });
  }
});

//@@ - /ads/:id/applicant
//@@ - puttar en ny ansökning till en ad
//@@ - privat - role:recruiter

router.put("/ads/:id/applicant", decode, async (req, res) => {
  console.log("wwwwww", req.user);
  //hämtar ad så vi kan posta applicant till den
  try {
    const { whyText, differentText, yourselfText } = req.body;

    //hämtar profilen från den som ansöker
    const profile = await Profile.findOne({ user: req.user });
    //hämtar ut den som äger ad:t för att kunna veta vilka ansökningar han "äger"
    const newApplicaton = new Application({
      user: req.user,
      profile: profile._id,
      ad: req.params.id,
      whyText,
      differentText,
      yourselfText
    });

    const ad = await Ad.findOneAndUpdate(
      //hämtar endast dokumentet om user inte är === req.user, för då har han applyat redan.
      { _id: req.params.id }, //"applicants.user": { $ne: req.user } },
      {
        //pushar in i dokumentet
        $push: {
          applicants: {
            applicant: newApplicaton.id,
            user: req.user
          }
        }
      },
      { new: true }
    );

    if (!ad) {
      return res.json({ msg: "you've already applied to this job!" });
    }
    //sparar ner ad.user på application
    newApplicaton.adOwner = ad.user;

    await newApplicaton.save();
    res.json({ application: newApplicaton, ad: ad });
  } catch (err) {
    console.log(err);
    res.json({ err: err.message });
  }
});

// @@route - /ads/
// @@desc - get all ads
// @@who - public

router.put("/ads", async (req, res) => {
  const { location, description } = req.body;

  try {
    //hämtar alla ads som finns från databasen

    const ads = await Ad.find({
      location: { $regex: ".*" + location + ".*" },
      short_description: { $regex: ".*" + description + ".*" }
    }).sort({ date: -1 });
    //res json

    console.log(ads.length);

    res.status(200).json(ads);
  } catch (err) {
    console.error(err);
    res.status(500).send("Server Error");
  }
});

router.get("/ads/search", async (req, res) => {
  try {
  } catch (error) {}
});

// @@ route /ads/:id
// @@desc - Gets 1 ad by id
//@@who - public

router.get("/ads/:id/", async (req, res) => {
  const adId = req.params.id;
  try {
    //hämtar ad:t utan applicants
    const singleAd = await Ad.findById(adId).select("-applicants");

    if (!singleAd) {
      return res.status(404).send("No ad found by that id");
    }
    //skicka tillbaka till klienten
    res.status(200).json(singleAd);
  } catch (err) {
    res.status(500).json(err.message);
    console.error(err);
  }
});

//@@ GETS APPLICATION BY AdID
// GET APPLICATION BY ADID

router.get("/ads/applications/:id", async (req, res) => {
  try {
    const applications = await Application.find({ ad: req.params.id })
      .populate("user")
      .populate("profile");
    if (!applications) {
      res.status(404).json({ msg: "You have no applications im sorry" });
    }

    res.json(applications);
  } catch (err) {
    console.error("wwww");
  }
});

//@@ route /ads/application/:id
//@@ desc - hämtar en application via id + applicants
//@@ status - PRIVAT (recruiters och workers)

router.get("/ads/application/:id", decode, async (req, res) => {
  try {
    //hämtar ut application och popultear med olika fields
    const application = await Application.findOne({
      id: req.params.id,
      //returnerar bara om den matchar någon av dessa dokument
      $or: [{ user: req.user }, { adOwner: req.user }]
    })
      .populate("ad", ["-applicants"])
      .populate("user", ["id", "role", "firstName", "lastName"])
      .populate("profile", ["profileTitle", "jobs"]);

    /*     if (
      application.user.toString() !== req.user ||
      application.adOwner.toString() !== req.user
    ) {
      return res.json({ msg: "only owners of the ad or the applicant can view this" });
    } */
    if (!application) {
      res.json({ msg: "Not found or not authorized to see this ad" });
    }
    //selectar user från ad

    res.json(application);
    /*     appli.applicants.id(req.params.id).populate("user", ["name"]);
     */
  } catch (err) {
    console.error(err.message);
  }
});

//@@route - /ads/application/:id/sendStatus
//@@ rejectar eller accetpar en application

router.put("/application/:id/sendStatus/", decode, async (req, res) => {
  const {
    adStatus,
    reasonApplication: { whyApplication, interviewDate, interviewLocation }
  } = req.body;

  try {
    if (adStatus == "accepted") {
      const application = await Application.findByIdAndUpdate(
        req.params.id,
        {
          $set: {
            status: {
              adStatus: adStatus,
              whyApplication,
              interviewDate,
              interviewLocation
            }
          }
        },
        { new: true }
      );
      const ad = await Ad.findByIdAndUpdate(application.ad, {
        $inc: {
          accepted: 1
        }
      });
      return res.json({
        accepted: ad.accepted,
        adStatus: application.status.adStatus,
        id: application._id
      });
    }

    if (adStatus == "rejected") {
      const application = await Application.findByIdAndUpdate(
        req.params.id,
        {
          $set: {
            status: {
              adStatus: adStatus
            }
          }
        },
        { new: true }
      );
      const ad = await Ad.findByIdAndUpdate(application.ad, {
        $inc: {
          rejected: 1
        }
      });
      return res.json({
        accepted: ad.accepted,
        adStatus: application.adStatus,
        id: application._id
      });
    }

    if (!application) {
      return res.json({ msg: "no application by that id found" });
    }

    /* if (req.user === application.adOwner.toString()) {
      res.json({ msg: "you can't reject someone elses application" });
    } */
  } catch (err) {
    res.json(err.message);
  }
});

// @@ route - gets all ads the recruiter has for himself
// @
router.get("/ads/recruiter/myads", decode, async (req, res) => {
  console.log(req.user);
  try {
    //populatear alla recruiter ads med info från varje användare
    //som postar en application
    const recruiterAds = await Ad.find({ user: req.user })
      .populate({
        path: "applicants.applicant",
        populate: { path: "profile" }
      })
      .populate({
        path: "applicants.applicant",
        populate: { path: "user", select: "-password" }
      });

    res.json(recruiterAds);
  } catch (err) {
    console.log(err.message);
  }
});

//@@ /ads/recruiter/ad/:id

router.get("/ads/recruiter/ad/:id", decode, async (req, res) => {
  console.log(req.user);
  try {
    //hämtar ad via id, men bara om samma person som skapat den.
    const recruiterAd = await Ad.findOne({ _id: req.params.id, user: req.user })
      .populate({
        path: "applicants.applicant",
        populate: { path: "profile", select: "jobs" }
      })
      .populate({
        path: "applicants.applicant",
        populate: { path: "user", select: "-password" }
      });

    if (!recruiterAd) {
      res.json({ msg: "No ad found by that id" });
    }

    res.json(recruiterAd);
  } catch (err) {
    console.log(err.message);
  }
});

//@@route - /ads/:id
//@@desc - delete an ad
//@@access - private: owner only

router.delete("/ads/:id", async (req, res) => {
  try {
    const ad = await Ad.findByIdAndDelete(req.params.id);

    if (req.user !== ad.user) {
      return res.json({
        msg: "Nice try! You can't delete someone elses Ad!"
      });
    }

    ad.save();
    res.json(ad);
  } catch (err) {
    console.error(err.message);
    res
      .status(404)
      .send("Something happened... Our engineers are working on it!");
  }
});

router.get("/applications/my", decode, async (req, res) => {
  try {
    const application = await Application.find({ user: req.user })
      .populate("profile")
      .populate("user");
    if (!application) {
      return res.json({ msg: "No applications found" });
    }

    res.json(application);
  } catch (err) {}
});

router.get;

module.exports = router;
