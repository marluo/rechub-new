const express = require("express");
const mongoose = require("mongoose");
require("dotenv").config();
const validator = require("validator");
const jwt = require("jsonwebtoken");
const decode = require("../middleware/decode");
const bcrypt = require("bcryptjs");
const Profile = require("../models/Profile");
const router = express.Router();
const Joi = require("@hapi/joi");
const schema = require("../validation/registerjoi");
const validateUser = require("../validation/registerjoi");
const User = require("../models/User");

// @@route - regga en user
// @@desc - regga en user och skicka token
// @@who - public

router.post("/api/users/register", async (req, res) => {
  try {
    //destructa objektet
    const { email, username, password, role, firstName, lastName } = req.body;
    console.log(role);
    const error = validateUser({
      email,
      username,
      password,
      role,
      firstName,
      lastName
    });
    if (error.error !== null) {
      console.log(error);
      return res.status(422).json({
        status: "error",
        message: error.message,
        data: error
      });
    }

    console.log("wwwwwwww");

    //hitta user i db, om finns skickar vi iväg ett meddelande till användaren
    const user = await User.findOne({ email });

    if (user) {
      return res.json({
        message: "User with that email is already registered"
      });
    }

    //Annars akapas en ny user upp
    const newUser = new User({
      email,
      username,
      password,
      role,
      firstName,
      lastName
    });

    const profile = new Profile({
      user: newUser._id
      //skapar upp en ny profil utan info för att logiken blev så nu i efterhand
    });
    await profile.save();

    //hashar lösenordet
    newUser.password = await bcrypt.hash(newUser.password, 10);
    //sparar user
    await newUser.save();

    //payload som vi ska signa/codea

    //signera och skapa en token
    jwt.sign(
      { id: newUser.id, name: `${firstName} ${lastName}`, role: newUser.role },
      process.env.JWTSECRET,

      (err, token) => {
        //om error
        if (err) throw err;
        //skicka tillbaka token
        return res.json({
          id: newUser.id,
          token,
          firstName,
          lastName,
          role,
          username
        });
      }
    );
  } catch (err) {
    console.log(err.message);
    res.status(500).send("Server error");
  }
});

// @@route - logga in user
// @@desc - logga in user och skicka token
// @@who - public

router.post("/api/users/login", async (req, res) => {
  try {
    const { email, password } = req.body;
    const user = await User.findOne({ email });
    //hitta user och se om han är reggad med den emailen.

    if (!user) {
      return res.status(404).json({ msg: "User doesn't exist" });
      //om ingen user hittas, skickar vi detta meddelande
    }

    const { id, firstName, lastName, role, username } = user;
    //om user hittas, destructar vi detta.

    //kollar om användaren finns i databasen

    const checkPassword = await bcrypt.compare(password, user.password);
    //jämför lösenordet med bcrypt för att se om lösen är samma som i db
    //kollar om lösenordet är rätt
    if (!checkPassword) {
      return res.status(404).send({ msg: "Incorrect password or username" });
      //om lösenordet är fel skickar vi tillbaka detta till klienten
    }

    jwt.sign(
      { id: id, name: `${firstName} ${lastName}`, role: role },
      process.env.JWTSECRET,
      (err, token) => {
        res
          .status(200)
          .json({ id, token, firstName, lastName, role, username });
      }
    );
  } catch (err) {
    console.error(err);
    res.status(404).send({ err: "something" });
  }
});

router.get("/users/auth", decode, async (req, res) => {
  try {
    const user = await User.findById(req.user).select("-password");
    console.log("ww", user);

    if (!user) {
      res.json({ msg: "no user found by that id" });
    }

    res.send(user);
  } catch (err) {
    console.error(err.message);
    res.json("error");
  }
});

module.exports = router;
